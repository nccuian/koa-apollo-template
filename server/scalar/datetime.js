import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export const typeDef = `
    scalar DateTime
`
export const resolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Unix Timestamp（毫秒）',
    // 從前端 variables 進來的 input
    parseValue (value) {
      return new Date(value) // value from the client
    },
    // 輸出到前端
    serialize (value) {
      return new Date(value).getTime() // value sent to the client
    },
    // 從前端 inline variables 進來的 input
    parseLiteral (ast) {
      if (ast.kind === Kind.FLOAT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    }
  })
}
