import { ApolloServer, ApolloError} from 'apollo-server-koa';
import jsonwebtoken from 'jsonwebtoken'
import koaBetterBody from 'koa-bodyparser'
import cors from 'kcors';
import { merge } from 'lodash'
import config from './config'
import RedisHelper from './helper/redis'
import requestIp from 'request-ip'
import bootstrap from './bootstrap'
import Koa from 'koa'
import Router from 'koa-router'
import Model from './db_model'
import Services from './services'
const env = process.env.NODE_ENV || 'development';
// Scalar
import {
  typeDef as DateTime, resolvers as dateTimeScalar
} from './scalar/datetime'

// Model
// import { typeDef as Page, resolvers as pageResolvers } from './model/page'

// Mutation
// import { typeDef as shoppingCartMutation, resolvers as shoppingCartMutationResolvers } from './mutation/shoppingcart'

// 設定快取伺服器
global.redis = new RedisHelper()

const db = (new Model()).getDb()
global.db = db
global.services = new Services()

// apollo setting
const typeDefs = [DateTime, Page]
const resolvers = merge(dateTimeScalar)
const context = ({ ctx }) => {
  let user = null
  let accessToken = {}
  if (env !== 'test') {
    try {
      const jwtToken = ctx.req.headers['x-accesstoken']
      accessToken = jsonwebtoken.verify(jwtToken, config.jwtKey.key)
      user = {
        id: accessToken.userId,
        jwtToken: jwtToken
      }
    } catch (err) {} // error
    return {
      ctx: ctx,
      ip: requestIp.getClientIp(ctx.request),
      dataloaders: {},
      user: user,
      locales: 'zh-Hant-TW'
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  tracing: env === 'development',
  playground: env === 'development'
})

const app = new Koa()
app.use(koaBetterBody());
function verifyOrigin(ctx) {
  var origin = ctx.headers.origin;
  var validOrigins = [
    'http://localhost:3000',
  ];
  if (validOrigins.indexOf(origin) !== -1) {
    return origin
  }
}
app.use(cors({
  origin: verifyOrigin
}));

const router = new Router()
router.get('/', async (ctx, next) => {
  ctx.body = 'hello'
})
router.get('/clearcache', async (ctx, next) => {
  global.redis.flushall()
  ctx.body = ''
})

app.use(router.routes())
  .use(router.allowedMethods())
server.applyMiddleware({ app })

let service = async () => {
  await new global.Promise((reslove, reject) => {
    db.sequelize.authenticate().then(async () => {
      await db.sequelize.sync({ force: config.postgresConnection.force })
      if (config.postgresConnection.force ){
        await bootstrap()
      }
      app.listen(
        { port: config.port },
        () =>
          console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
      )
      reslove('')
    }).catch(err => {
      console.error('Unable to connect to the database:', err)
    })
  })
  return server
}

service = service()
export {
  service
}
