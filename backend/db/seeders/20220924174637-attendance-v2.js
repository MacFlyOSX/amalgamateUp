'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendances', [
      { eventId: 4, userId: 3, status: 'member' },
      { eventId: 5, userId: 4, status: 'member' },
      { eventId: 6, userId: 2, status: 'member' },
      { eventId: 7, userId: 6, status: 'member' },
      { eventId: 8, userId: 3, status: 'member' },
      { eventId: 9, userId: 5, status: 'member' },
      { eventId: 10, userId: 5, status: 'member' },
      { eventId: 11, userId: 4, status: 'member' },
      { eventId: 12, userId: 2, status: 'member' },
      { eventId: 13, userId: 6, status: 'member' },
      { eventId: 14, userId: 5, status: 'member' },
      { eventId: 15, userId: 3, status: 'member' },
      { eventId: 16, userId: 6, status: 'member' },
      { eventId: 17, userId: 4, status: 'member' },
      { eventId: 18, userId: 2, status: 'member' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
