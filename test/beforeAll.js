
// import redis from 'redis'
// import RedisHelper from '../helper/redis'
// import config from '../config'
// import Model from '../db_model'
import { service } from '../server/index'
import sinon from 'sinon'

beforeAll(async() => {
  global.sinon = sinon
  await service
})