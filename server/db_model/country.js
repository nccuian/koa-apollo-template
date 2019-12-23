const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    id: {
      type: Sequelize.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    // 國家名稱
    name: Sequelize.TEXT,
  }, {
      paranoid: true,
      tableName: 'Countries'
    });
  Country.associate = (models) => {
    Country.hasMany(models.Fare)
  }
  return Country;
};
