'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsTo(models.Group, {
        foreignKey: 'groupId'
      });
      Event.belongsTo(models.Venue, {
        foreignKey: 'venueId'
      });
      Event.belongsToMany(models.User, {
        through: models.Attendance,
        foreignKey: 'eventId',
        otherKey: 'userId'
      });
      Event.hasMany(models.Attendance, {
        foreignKey: 'eventId'
      });
    }
  }
  Event.init({
    venueId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: {
      type: DataTypes.STRING,
      validate: {
        isValid(val) {
          const types = ['Online', 'In person', 'Hybrid'];
          if (!types.includes(val)) {
            throw new Error('Must be a valid type')
          }
        }
      }
    },
    capacity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
