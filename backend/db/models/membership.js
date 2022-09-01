'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Membership.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Membership.belongsTo(models.Group, {
        foreignKey: 'groupId'
      });
    }
  }
  Membership.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      validate: {
        isValid(val) {
          const okayValues = ['member', 'co-host', 'pending', 'organizer'];
          if (!okayValues.includes(val)) {
            throw new Error('Please provide proper membership status.')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
