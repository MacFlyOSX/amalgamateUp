'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: '8423 MACADAMIA ST',
        city: 'Oklahoma City',
        state: 'OK',
        lat: '35.482309',
        lng: '-97.534994'
      },
      {
        groupId: 1,
        address: '4887 PISTACHIO PKWY',
        city: 'Little Rock',
        state: 'AR',
        lat: '34.736009',
        lng: '-92.331122'
      },
      {
        groupId: 2,
        address: '8529 CASHEW LN',
        city: 'Nashville',
        state: 'TN',
        lat: '36.165',
        lng: '-86.784'
      },
      {
        groupId: 2,
        address: '977 PECAN DR',
        city: 'Los Angeles',
        state: 'CA',
        lat: '34.0522',
        lng: '-118.2437'
      },
      {
        groupId: 3,
        address: '5504 CASHEW CT',
        city: 'Columbia',
        state: 'SC',
        lat: '34.000',
        lng: '-81.035'
      },
      {
        groupId: 3,
        address: '7168 HAZELNUT DR',
        city: 'Honolulu',
        state: 'HI',
        lat: '21.30895',
        lng: '-157.826182'
      },
      {
        groupId: 4,
        address: '71 WALNUT RD',
        city: 'Raleigh',
        state: 'NC',
        lat: '35.771',
        lng: '-78.638'
      },
      {
        groupId: 4,
        address: '5051 ALMOND AVE',
        city: 'Topeka',
        state: 'KS',
        lat: '39.04',
        lng: '-95.69'
      },
      {
        groupId: 5,
        address: '2981 MACADAMIA LN',
        city: 'Jefferson City',
        state: 'MO',
        lat: '38.572954',
        lng: '-92.189283'
      },
      {
        groupId: 5,
        address: '4316 PEANUT PLZ',
        city: 'Salt Lake City',
        state: 'UT',
        lat: '40.7547',
        lng: '-111.892622'
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Venues', {
      where: { address: ['4316 PEANUT PLZ',
                        '2981 MACADAMIA LN',
                        '8423 MACADAMIA ST',
                        '4887 PISTACHIO PKWY',
                        '8529 CASHEW LN',
                        '977 PECAN DR',
                        '5504 CASHEW CT',
                        '7168 HAZELNUT DR',
                        '71 WALNUT RD',
                        '5051 ALMOND AVE']
                      }
    }, {});
  }
};
