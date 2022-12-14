'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', [
      { userId: 2, groupId: 10, status: 'member' },
      { userId: 2, groupId: 2, status: 'member' },
      { userId: 2, groupId: 15, status: 'member' },
      { userId: 2, groupId: 14, status: 'member' },
      { userId: 2, groupId: 13, status: 'member' },
      { userId: 2, groupId: 17, status: 'member' },
      { userId: 2, groupId: 16, status: 'member' },
      { userId: 2, groupId: 9, status: 'member' },
      { userId: 2, groupId: 4, status: 'member' },
      { userId: 2, groupId: 1, status: 'member' },
      { userId: 3, groupId: 10, status: 'member' },
      { userId: 3, groupId: 13, status: 'member' },
      { userId: 3, groupId: 3, status: 'member' },
      { userId: 3, groupId: 2, status: 'member' },
      { userId: 3, groupId: 12, status: 'member' },
      { userId: 3, groupId: 1, status: 'member' },
      { userId: 3, groupId: 5, status: 'member' },
      { userId: 3, groupId: 11, status: 'member' },
      { userId: 3, groupId: 14, status: 'member' },
      { userId: 3, groupId: 9, status: 'member' },
      { userId: 4, groupId: 4, status: 'member' },
      { userId: 4, groupId: 9, status: 'member' },
      { userId: 4, groupId: 12, status: 'member' },
      { userId: 4, groupId: 6, status: 'member' },
      { userId: 4, groupId: 8, status: 'member' },
      { userId: 4, groupId: 13, status: 'member' },
      { userId: 4, groupId: 2, status: 'member' },
      { userId: 4, groupId: 1, status: 'member' },
      { userId: 4, groupId: 16, status: 'member' },
      { userId: 4, groupId: 3, status: 'member' },
      { userId: 5, groupId: 6, status: 'member' },
      { userId: 5, groupId: 1, status: 'member' },
      { userId: 5, groupId: 2, status: 'member' },
      { userId: 5, groupId: 17, status: 'member' },
      { userId: 5, groupId: 11, status: 'member' },
      { userId: 5, groupId: 18, status: 'member' },
      { userId: 5, groupId: 5, status: 'member' },
      { userId: 5, groupId: 15, status: 'member' },
      { userId: 5, groupId: 3, status: 'member' },
      { userId: 5, groupId: 16, status: 'member' },
      { userId: 6, groupId: 1, status: 'member' },
      { userId: 6, groupId: 9, status: 'member' },
      { userId: 6, groupId: 12, status: 'member' },
      { userId: 6, groupId: 17, status: 'member' },
      { userId: 6, groupId: 10, status: 'member' },
      { userId: 6, groupId: 2, status: 'member' },
      { userId: 6, groupId: 8, status: 'member' },
      { userId: 6, groupId: 5, status: 'member' },
      { userId: 6, groupId: 3, status: 'member' },
      { userId: 6, groupId: 4, status: 'member' },
      { userId: 7, groupId: 17, status: 'member' },
      { userId: 7, groupId: 14, status: 'member' },
      { userId: 7, groupId: 10, status: 'member' },
      { userId: 7, groupId: 8, status: 'member' },
      { userId: 7, groupId: 4, status: 'member' },
      { userId: 7, groupId: 16, status: 'member' },
      { userId: 7, groupId: 15, status: 'member' },
      { userId: 7, groupId: 5, status: 'member' },
      { userId: 7, groupId: 6, status: 'member' },
      { userId: 7, groupId: 18, status: 'member' },
      { userId: 8, groupId: 17, status: 'member' },
      { userId: 8, groupId: 8, status: 'member' },
      { userId: 8, groupId: 18, status: 'member' },
      { userId: 8, groupId: 11, status: 'member' },
      { userId: 8, groupId: 14, status: 'member' },
      { userId: 8, groupId: 12, status: 'member' },
      { userId: 8, groupId: 10, status: 'member' },
      { userId: 8, groupId: 1, status: 'member' },
      { userId: 8, groupId: 6, status: 'member' },
      { userId: 8, groupId: 7, status: 'member' },
      { userId: 9, groupId: 2, status: 'member' },
      { userId: 9, groupId: 15, status: 'member' },
      { userId: 9, groupId: 1, status: 'member' },
      { userId: 9, groupId: 6, status: 'member' },
      { userId: 9, groupId: 9, status: 'member' },
      { userId: 9, groupId: 11, status: 'member' },
      { userId: 9, groupId: 10, status: 'member' },
      { userId: 9, groupId: 13, status: 'member' },
      { userId: 9, groupId: 8, status: 'member' },
      { userId: 9, groupId: 4, status: 'member' },
      { userId: 10, groupId: 2, status: 'member' },
      { userId: 10, groupId: 9, status: 'member' },
      { userId: 10, groupId: 4, status: 'member' },
      { userId: 10, groupId: 3, status: 'member' },
      { userId: 10, groupId: 14, status: 'member' },
      { userId: 10, groupId: 17, status: 'member' },
      { userId: 10, groupId: 5, status: 'member' },
      { userId: 10, groupId: 1, status: 'member' },
      { userId: 10, groupId: 12, status: 'member' },
      { userId: 10, groupId: 15, status: 'member' },
      { userId: 11, groupId: 17, status: 'member' },
      { userId: 11, groupId: 14, status: 'member' },
      { userId: 11, groupId: 10, status: 'member' },
      { userId: 11, groupId: 16, status: 'member' },
      { userId: 11, groupId: 3, status: 'member' },
      { userId: 11, groupId: 1, status: 'member' },
      { userId: 11, groupId: 2, status: 'member' },
      { userId: 11, groupId: 6, status: 'member' },
      { userId: 11, groupId: 8, status: 'member' },
      { userId: 11, groupId: 15, status: 'member' },
      { userId: 12, groupId: 4, status: 'member' },
      { userId: 12, groupId: 7, status: 'member' },
      { userId: 12, groupId: 9, status: 'member' },
      { userId: 12, groupId: 18, status: 'member' },
      { userId: 12, groupId: 3, status: 'member' },
      { userId: 12, groupId: 12, status: 'member' },
      { userId: 12, groupId: 17, status: 'member' },
      { userId: 12, groupId: 2, status: 'member' },
      { userId: 12, groupId: 8, status: 'member' },
      { userId: 12, groupId: 14, status: 'member' },
      { userId: 13, groupId: 7, status: 'member' },
      { userId: 13, groupId: 6, status: 'member' },
      { userId: 13, groupId: 5, status: 'member' },
      { userId: 13, groupId: 8, status: 'member' },
      { userId: 13, groupId: 9, status: 'member' },
      { userId: 13, groupId: 17, status: 'member' },
      { userId: 13, groupId: 14, status: 'member' },
      { userId: 13, groupId: 12, status: 'member' },
      { userId: 13, groupId: 16, status: 'member' },
      { userId: 13, groupId: 11, status: 'member' },
      { userId: 14, groupId: 8, status: 'member' },
      { userId: 14, groupId: 14, status: 'member' },
      { userId: 14, groupId: 16, status: 'member' },
      { userId: 14, groupId: 10, status: 'member' },
      { userId: 14, groupId: 11, status: 'member' },
      { userId: 14, groupId: 5, status: 'member' },
      { userId: 14, groupId: 6, status: 'member' },
      { userId: 14, groupId: 12, status: 'member' },
      { userId: 14, groupId: 3, status: 'member' },
      { userId: 14, groupId: 2, status: 'member' },
      { userId: 15, groupId: 7, status: 'member' },
      { userId: 15, groupId: 15, status: 'member' },
      { userId: 15, groupId: 11, status: 'member' },
      { userId: 15, groupId: 14, status: 'member' },
      { userId: 15, groupId: 13, status: 'member' },
      { userId: 15, groupId: 16, status: 'member' },
      { userId: 15, groupId: 12, status: 'member' },
      { userId: 15, groupId: 9, status: 'member' },
      { userId: 15, groupId: 18, status: 'member' },
      { userId: 15, groupId: 8, status: 'member' },
      { userId: 16, groupId: 2, status: 'member' },
      { userId: 16, groupId: 7, status: 'member' },
      { userId: 16, groupId: 12, status: 'member' },
      { userId: 16, groupId: 11, status: 'member' },
      { userId: 16, groupId: 15, status: 'member' },
      { userId: 16, groupId: 1, status: 'member' },
      { userId: 16, groupId: 4, status: 'member' },
      { userId: 16, groupId: 17, status: 'member' },
      { userId: 16, groupId: 13, status: 'member' },
      { userId: 16, groupId: 10, status: 'member' },
      { userId: 17, groupId: 3, status: 'member' },
      { userId: 17, groupId: 18, status: 'member' },
      { userId: 17, groupId: 7, status: 'member' },
      { userId: 17, groupId: 14, status: 'member' },
      { userId: 17, groupId: 8, status: 'member' },
      { userId: 17, groupId: 10, status: 'member' },
      { userId: 17, groupId: 17, status: 'member' },
      { userId: 17, groupId: 9, status: 'member' },
      { userId: 17, groupId: 16, status: 'member' },
      { userId: 17, groupId: 1, status: 'member' },
      { userId: 18, groupId: 4, status: 'member' },
      { userId: 18, groupId: 18, status: 'member' },
      { userId: 18, groupId: 14, status: 'member' },
      { userId: 18, groupId: 9, status: 'member' },
      { userId: 18, groupId: 16, status: 'member' },
      { userId: 18, groupId: 6, status: 'member' },
      { userId: 18, groupId: 7, status: 'member' },
      { userId: 18, groupId: 17, status: 'member' },
      { userId: 18, groupId: 5, status: 'member' },
      { userId: 18, groupId: 2, status: 'member' },
      { userId: 19, groupId: 18, status: 'member' },
      { userId: 19, groupId: 10, status: 'member' },
      { userId: 19, groupId: 12, status: 'member' },
      { userId: 19, groupId: 3, status: 'member' },
      { userId: 19, groupId: 14, status: 'member' },
      { userId: 19, groupId: 13, status: 'member' },
      { userId: 19, groupId: 9, status: 'member' },
      { userId: 19, groupId: 11, status: 'member' },
      { userId: 19, groupId: 8, status: 'member' },
      { userId: 19, groupId: 15, status: 'member' },
      { userId: 20, groupId: 10, status: 'member' },
      { userId: 20, groupId: 15, status: 'member' },
      { userId: 20, groupId: 2, status: 'member' },
      { userId: 20, groupId: 11, status: 'member' },
      { userId: 20, groupId: 9, status: 'member' },
      { userId: 20, groupId: 17, status: 'member' },
      { userId: 20, groupId: 12, status: 'member' },
      { userId: 20, groupId: 5, status: 'member' },
      { userId: 20, groupId: 4, status: 'member' },
      { userId: 20, groupId: 7, status: 'member' },
      { userId: 21, groupId: 13, status: 'member' },
      { userId: 21, groupId: 2, status: 'member' },
      { userId: 21, groupId: 5, status: 'member' },
      { userId: 21, groupId: 9, status: 'member' },
      { userId: 21, groupId: 10, status: 'member' },
      { userId: 21, groupId: 12, status: 'member' },
      { userId: 21, groupId: 15, status: 'member' },
      { userId: 21, groupId: 1, status: 'member' },
      { userId: 21, groupId: 8, status: 'member' },
      { userId: 21, groupId: 14, status: 'member' },
      { userId: 22, groupId: 2, status: 'member' },
      { userId: 22, groupId: 3, status: 'member' },
      { userId: 22, groupId: 16, status: 'member' },
      { userId: 22, groupId: 17, status: 'member' },
      { userId: 22, groupId: 12, status: 'member' },
      { userId: 22, groupId: 11, status: 'member' },
      { userId: 22, groupId: 10, status: 'member' },
      { userId: 22, groupId: 6, status: 'member' },
      { userId: 22, groupId: 7, status: 'member' },
      { userId: 22, groupId: 13, status: 'member' },
      { userId: 23, groupId: 11, status: 'member' },
      { userId: 23, groupId: 3, status: 'member' },
      { userId: 23, groupId: 15, status: 'member' },
      { userId: 23, groupId: 16, status: 'member' },
      { userId: 23, groupId: 9, status: 'member' },
      { userId: 23, groupId: 8, status: 'member' },
      { userId: 23, groupId: 17, status: 'member' },
      { userId: 23, groupId: 13, status: 'member' },
      { userId: 23, groupId: 12, status: 'member' },
      { userId: 23, groupId: 18, status: 'member' },
      { userId: 24, groupId: 4, status: 'member' },
      { userId: 24, groupId: 16, status: 'member' },
      { userId: 24, groupId: 3, status: 'member' },
      { userId: 24, groupId: 6, status: 'member' },
      { userId: 24, groupId: 9, status: 'member' },
      { userId: 24, groupId: 15, status: 'member' },
      { userId: 24, groupId: 18, status: 'member' },
      { userId: 24, groupId: 13, status: 'member' },
      { userId: 24, groupId: 7, status: 'member' },
      { userId: 24, groupId: 14, status: 'member' },
      { userId: 25, groupId: 14, status: 'member' },
      { userId: 25, groupId: 12, status: 'member' },
      { userId: 25, groupId: 11, status: 'member' },
      { userId: 25, groupId: 10, status: 'member' },
      { userId: 25, groupId: 7, status: 'member' },
      { userId: 25, groupId: 4, status: 'member' },
      { userId: 25, groupId: 3, status: 'member' },
      { userId: 25, groupId: 1, status: 'member' },
      { userId: 25, groupId: 2, status: 'member' },
      { userId: 25, groupId: 15, status: 'member' },
      { userId: 26, groupId: 5, status: 'member' },
      { userId: 26, groupId: 15, status: 'member' },
      { userId: 26, groupId: 12, status: 'member' },
      { userId: 26, groupId: 11, status: 'member' },
      { userId: 26, groupId: 2, status: 'member' },
      { userId: 26, groupId: 13, status: 'member' },
      { userId: 26, groupId: 8, status: 'member' },
      { userId: 26, groupId: 17, status: 'member' },
      { userId: 26, groupId: 1, status: 'member' },
      { userId: 26, groupId: 9, status: 'member' },
      { userId: 27, groupId: 2, status: 'member' },
      { userId: 27, groupId: 7, status: 'member' },
      { userId: 27, groupId: 10, status: 'member' },
      { userId: 27, groupId: 16, status: 'member' },
      { userId: 27, groupId: 5, status: 'member' },
      { userId: 27, groupId: 3, status: 'member' },
      { userId: 27, groupId: 13, status: 'member' },
      { userId: 27, groupId: 6, status: 'member' },
      { userId: 27, groupId: 11, status: 'member' },
      { userId: 27, groupId: 4, status: 'member' },
      { userId: 28, groupId: 14, status: 'member' },
      { userId: 28, groupId: 1, status: 'member' },
      { userId: 28, groupId: 15, status: 'member' },
      { userId: 28, groupId: 6, status: 'member' },
      { userId: 28, groupId: 8, status: 'member' },
      { userId: 28, groupId: 4, status: 'member' },
      { userId: 28, groupId: 17, status: 'member' },
      { userId: 28, groupId: 2, status: 'member' },
      { userId: 28, groupId: 13, status: 'member' },
      { userId: 28, groupId: 10, status: 'member' },
      { userId: 29, groupId: 6, status: 'member' },
      { userId: 29, groupId: 1, status: 'member' },
      { userId: 29, groupId: 15, status: 'member' },
      { userId: 29, groupId: 17, status: 'member' },
      { userId: 29, groupId: 11, status: 'member' },
      { userId: 29, groupId: 3, status: 'member' },
      { userId: 29, groupId: 7, status: 'member' },
      { userId: 29, groupId: 13, status: 'member' },
      { userId: 29, groupId: 14, status: 'member' },
      { userId: 29, groupId: 2, status: 'member' },
      { userId: 30, groupId: 3, status: 'member' },
      { userId: 30, groupId: 7, status: 'member' },
      { userId: 30, groupId: 12, status: 'member' },
      { userId: 30, groupId: 4, status: 'member' },
      { userId: 30, groupId: 5, status: 'member' },
      { userId: 30, groupId: 10, status: 'member' },
      { userId: 30, groupId: 17, status: 'member' },
      { userId: 30, groupId: 2, status: 'member' },
      { userId: 30, groupId: 6, status: 'member' },
      { userId: 30, groupId: 1, status: 'member' },
      { userId: 31, groupId: 15, status: 'member' },
      { userId: 31, groupId: 12, status: 'member' },
      { userId: 31, groupId: 9, status: 'member' },
      { userId: 31, groupId: 4, status: 'member' },
      { userId: 31, groupId: 3, status: 'member' },
      { userId: 31, groupId: 14, status: 'member' },
      { userId: 31, groupId: 13, status: 'member' },
      { userId: 31, groupId: 18, status: 'member' },
      { userId: 31, groupId: 2, status: 'member' },
      { userId: 31, groupId: 10, status: 'member' },
      { userId: 32, groupId: 7, status: 'member' },
      { userId: 32, groupId: 11, status: 'member' },
      { userId: 32, groupId: 1, status: 'member' },
      { userId: 32, groupId: 12, status: 'member' },
      { userId: 32, groupId: 13, status: 'member' },
      { userId: 32, groupId: 4, status: 'member' },
      { userId: 32, groupId: 14, status: 'member' },
      { userId: 32, groupId: 2, status: 'member' },
      { userId: 32, groupId: 18, status: 'member' },
      { userId: 32, groupId: 17, status: 'member' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Will be cleaned up with DELETE_CASCADE
  }
};
