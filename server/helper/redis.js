import Redis from 'ioredis'
import config from '../config/index'

export default class RedisHelper {
  constructor () {
    this.redis = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      keyPrefix: config.redis.prefix
    })
  }
  // 寫入(預設1小時)
  async set(key, value, expire = 60 * 60 * 60) {
    return await this.redis.set(key, JSON.stringify(value), 'EX', expire)
  }
  // 讀取
  async get(key) {
    const result = await this.redis.get(key)
    return (result ? JSON.parse(result) : null);
  }
  // 刪除全部
  async flushall(key, expire = 0, fn = undefined, args) {
    const keys = await this.getKeys(`*`)
    keys.map((key) => {
      const regex = new RegExp(config.redis.prefix, "g");
      this.redis.del(key.replace(regex, ''))
    })
  }
  // 尋找keys
  async getKeys(key) {
    return new Promise((resolve, reject) => {
      this.redis.keys(`${config.redis.prefix}${key}`, function (err, keys) {
        resolve(keys)
      });
    })
  }


  // 刪除一筆資料
  async del (key) {
    return await this.redis.del(key)
  }
  async zadd(key,value) {
    return await this.redis.zadd(key,value)
  }
  async zrange(key, start, end, WITHSCORES) {
    return await this.redis.zrangebyscore(key, start, end, WITHSCORES);
  }
  // zrevrangebyscore
  
  // keys (key) {
  //   let keyFormat = `${key}`
  //   return new Promise((resolve, reject) => {
  //     this.redis.keys(keyFormat, async (_err, value) => {
  //       resolve(value)
  //     })
  //   })
  // }
  // deleteKeys (key) {
  //   const redis = this.redis
  //   let keyFormat = `${key}`

  //   return new Promise((resolve, reject) => {
  //     redis.keys(keyFormat, async (_err, value) => {
  //       value.map((id) => {
  //         redis.del(id)
  //       })
  //       resolve(true)
  //     })
  //   })
  // }
  // deleteBySort (key, name) {
  //   this.redis.zrem([key, name])
  // }
}
