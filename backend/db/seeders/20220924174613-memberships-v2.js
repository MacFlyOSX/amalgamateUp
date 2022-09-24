'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', [
      { userId: 3, groupId: 4, status: 'organizer' },
      { userId: 4, groupId: 5, status: 'organizer' },
      { userId: 2, groupId: 6, status: 'organizer' },
      { userId: 6, groupId: 7, status: 'organizer' },
      { userId: 3, groupId: 8, status: 'organizer' },
      { userId: 5, groupId: 9, status: 'organizer' },
      { userId: 5, groupId: 10, status: 'organizer' },
      { userId: 4, groupId: 11, status: 'organizer' },
      { userId: 2, groupId: 12, status: 'organizer' },
      { userId: 6, groupId: 13, status: 'organizer' },
      { userId: 5, groupId: 14, status: 'organizer' },
      { userId: 3, groupId: 15, status: 'organizer' },
      { userId: 6, groupId: 16, status: 'organizer' },
      { userId: 4, groupId: 17, status: 'organizer' },
      { userId: 2, groupId: 18, status: 'organizer' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Will be cleaned up with DELETE_CASCADE
  }
};
