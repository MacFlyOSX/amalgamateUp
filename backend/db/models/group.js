'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, {
        foreignKey: 'organizerId',
        as: 'Organizer'
      });
      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: 'groupId',
        otherKey: 'userId'
      });
      Group.hasMany(models.Membership, {
        foreignKey: 'groupId'
      });
      Group.hasMany(models.Venue, {
        foreignKey: 'groupId',
        as: 'Venues'
      });
      Group.belongsToMany(models.Venue, {
        through: models.Event,
        foreignKey: 'groupId',
        otherKey: 'venueId'
      });
      Group.hasMany(models.Event, {
        foreignKey: 'groupId'
      });
      Group.hasMany(models.GroupImage, {
        foreignKey: 'groupId'
      });
    }
  }
  Group.init({
    organizerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    about: DataTypes.TEXT,
    type: {
      type: DataTypes.STRING,
      validate: {
        isValid(val) {
          const types = ['Online', 'In person'];
          if (!types.includes(val)) {
            throw new Error('Must be a valid type')
          }
        }
      }
    },
    private: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
    defaultScope: {

    },
    scopes: {
      forEvents: {
        exclude: ['organizerId', 'about', 'type', 'private', 'createdAt', 'updatedAt']
      }
    }
  });
  return Group;
};
