'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', [
      {
        userId: 1,
        groupId: 1,
        status: 'organizer'
      },
      {
        userId: 1,
        groupId: 2,
        status: 'organizer'
      },
      {
        userId: 1,
        groupId: 3,
        status: 'organizer'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Will be cleaned up with DELETE_CASCADE
  }
};
