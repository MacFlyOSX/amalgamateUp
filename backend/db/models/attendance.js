'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.Event, {
        foreignKey: 'eventId'
      });
      Attendance.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }
  Attendance.init({
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      validate: {
        isValid(val) {
          const validStatus = ['member', 'waitlist', 'pending'];
          if (!validStatus.includes(val)) {
            throw new Error('Must provide a valid status')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
