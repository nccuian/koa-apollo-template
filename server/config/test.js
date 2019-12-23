export default {
  'port': 'port',
  'postgresConnection': {
    'dialect': 'sqlite',
    'storage': './db.test.sqlite',
    'username': null,
    'password': null,
    'database': null,
    'force': true,
    'logging': false
  },
  'jwtKey': {
    'key': 'jwtKey'
  },
  'redis': {
    // 'name': 'name:',
    'prefix': 'test:',
    'host': 'localhost',
    'port': 6383
  }
}
