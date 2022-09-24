'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendances', [
      { eventId: 4, userId: 11, status: 'member' },
      { eventId: 5, userId: 26, status: 'member' },
      { eventId: 6, userId: 24, status: 'member' },
      { eventId: 7, userId: 6, status: 'member' },
      { eventId: 8, userId: 26, status: 'member' },
      { eventId: 9, userId: 12, status: 'member' },
      { eventId: 10, userId: 25, status: 'member' },
      { eventId: 11, userId: 4, status: 'member' },
      { eventId: 12, userId: 21, status: 'member' },
      { eventId: 13, userId: 17, status: 'member' },
      { eventId: 14, userId: 20, status: 'member' },
      { eventId: 15, userId: 11, status: 'member' },
      { eventId: 16, userId: 24, status: 'member' },
      { eventId: 17, userId: 4, status: 'member' },
      { eventId: 18, userId: 22, status: 'member' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
