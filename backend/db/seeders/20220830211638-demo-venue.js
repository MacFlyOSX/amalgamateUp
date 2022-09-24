'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: '71 Walnut Rd',
        city: 'San Francisco',
        state: 'CA',
        lat: '37.773972',
        lng: '-122.431297'
      },
      {
        groupId: 2,
        address: '4887 Pistachio Pkwy',
        city: 'San Francisco',
        state: 'CA',
        lat: '37.773972',
        lng: '-122.431297'
      },
      {
        groupId: 3,
        address: '4316 Peanut Plaza',
        city: 'San Francisco',
        state: 'CA',
        lat: '37.773972',
        lng: '-122.431297'
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Venues', {
      where: { address: ['71 Walnut Rd',
                         '4887 Pistachio Pkwy',
                         '4316 Peanut Plaza']
                      }
    }, {});
  }
};
