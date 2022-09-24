'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendances', [
      {
        eventId: 1,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 2,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 3,
        userId: 1,
        status: 'member'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
