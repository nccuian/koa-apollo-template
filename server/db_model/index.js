import config from '../config'
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
module.exports = class Model {
  constructor () {
    const sequelize = new Sequelize(config.postgresConnection)
    var db = {}

    fs
      .readdirSync(__dirname)
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
      })
      .forEach((file) => {
        var model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
      })

    Object.keys(db).forEach((modelName) => {
      if ('associate' in db[modelName]) {
        db[modelName].associate(db)
      }
    })

    this.db = db
    this.db.Sequelize = Sequelize
    this.db.sequelize = sequelize
  }
  getDb () {
    return this.db
  }
}
