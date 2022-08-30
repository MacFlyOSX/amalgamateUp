'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', [
      {
        userId: 2,
        groupId: 1,
        status: 'organizer'
      },
      {
        userId: 3,
        groupId: 1,
        status: 'co-host'
      },
      {
        userId: 1,
        groupId: 1,
        status: 'member'
      },
      {
        userId: 1,
        groupId: 2,
        status: 'organizer'
      },
      {
        userId: 2,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 3,
        groupId: 2,
        status: 'member'
      },
      {
        userId: 2,
        groupId: 3,
        status: 'organizer'
      },
      {
        userId: 1,
        groupId: 3,
        status: 'co-host'
      },
      {
        userId: 3,
        groupId: 3,
        status: 'member'
      },
      {
        userId: 3,
        groupId: 4,
        status: 'organizer'
      },
      {
        userId: 2,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 1,
        groupId: 4,
        status: 'member'
      },
      {
        userId: 1,
        groupId: 5,
        status: 'organizer'
      },
      {
        userId: 3,
        groupId: 5,
        status: 'member'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Will be cleaned up with DELETE_CASCADE
  }
};
