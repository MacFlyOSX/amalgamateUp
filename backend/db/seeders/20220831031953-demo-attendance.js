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
        eventId: 1,
        userId: 2,
        status: 'pending'
      },
      {
        eventId: 1,
        userId: 3,
        status: 'pending'
      },
      {
        eventId: 1,
        userId: 4,
        status: 'waitlist'
      },
      {
        eventId: 2,
        userId: 3,
        status: 'member'
      },
      {
        eventId: 2,
        userId: 1,
        status: 'pending'
      },
      {
        eventId: 2,
        userId: 2,
        status: 'pending'
      },
      {
        eventId: 3,
        userId: 4,
        status: 'waitlist'
      },
      {
        eventId: 3,
        userId: 3,
        status: 'member'
      },
      {
        eventId: 3,
        userId: 1,
        status: 'member'
      },
      {
        eventId: 4,
        userId: 1,
        status: 'pending'
      },
      {
        eventId: 4,
        userId: 2,
        status: 'member'
      },
      {
        eventId: 4,
        userId: 4,
        status: 'member'
      },
      {
        eventId: 5,
        userId: 3,
        status: 'waitlist'
      },
      {
        eventId: 5,
        userId: 1,
        status: 'pending'
      },
      {
        eventId: 5,
        userId: 2,
        status: 'member'
      },
      {
        eventId: 5,
        userId: 4,
        status: 'member'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
