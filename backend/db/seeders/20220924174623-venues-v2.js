'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: 4,
        address: '4402 Peanut Ln',
        city: 'Monterey Park',
        state: 'CA',
        lat: '42.659829',
        lng: '-73.781339'
      },
      {
        groupId: 5,
        address: '4450 Hazelnut Ave',
        city: 'New York',
        state: 'NY',
        lat: '38.555605',
        lng: '-121.468926'
      },
      {
        groupId: 6,
        address: '4797 Cashew Ln',
        city: 'Los Angeles',
        state: 'CA',
        lat: '44.26639',
        lng: '-72.57194'
      },
      {
        groupId: 7,
        address: '3080 Peanut St',
        city: 'Long Beach',
        state: 'CA',
        lat: '48.813343',
        lng: '-100.779004'
      },
      {
        groupId: 8,
        address: '8462 Pistachio Dr',
        city: 'Brooklyn',
        state: 'NY',
        lat: '39.161921',
        lng: '-75.526755'
      },
      {
        groupId: 9,
        address: '1388 Walnut St',
        city: 'Salt Lake City',
        state: 'UT',
        lat: '47.042418',
        lng: '-122.893077'
      },
      {
        groupId: 10,
        address: '1746 Cashew Ln',
        city: 'Seattle',
        state: 'WA',
        lat: '36.165',
        lng: '-86.784'
      },
      {
        groupId: 11,
        address: '8764 Pistachio Rd',
        city: 'Portland',
        state: 'OR',
        lat: '39.790942',
        lng: '-86.147685'
      },
      {
        groupId: 12,
        address: '2085 Peanut Blvd',
        city: 'Phoenix',
        state: 'AZ',
        lat: '39.7391667',
        lng: '-104.984167'
      },
      {
        groupId: 13,
        address: '5762 Walnut Ct',
        city: 'Tallahassee',
        state: 'FL',
        lat: '39.783250',
        lng: '-89.650373'
      },
      {
        groupId: 14,
        address: '5049 Peanut Ln',
        city: 'Las Vegas',
        state: 'NV',
        lat: '40.269789',
        lng: '-76.875613'
      },
      {
        groupId: 15,
        address: '6333 Almond Pkwy',
        city: 'Orlando',
        state: 'FL',
        lat: '47.042418',
        lng: '-122.893077'
      },
      {
        groupId: 16,
        address: '4642 Chestnut St',
        city: 'Secaucus',
        state: 'NJ',
        lat: '38.197274',
        lng: '-84.86311'
      },
      {
        groupId: 17,
        address: '3395 Peanut Ct',
        city: 'San Diego',
        state: 'CA',
        lat: '39.161921',
        lng: '-75.526755'
      },
      {
        groupId: 18,
        address: '4182 Chestnut Dr',
        city: 'Dallas',
        state: 'TX',
        lat: '30.4518',
        lng: '-84.27277'
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Venues', {
      where: { address: [
        '4402 Peanut Ln',    '4450 Hazelnut Ave',
        '4797 Cashew Ln',    '3080 Peanut St',
        '8462 Pistachio Dr', '1388 Walnut St',
        '1746 Cashew Ln',    '8764 Pistachio Rd',
        '2085 Peanut Blvd',  '5762 Walnut Ct',
        '5049 Peanut Ln',    '6333 Almond Pkwy',
        '4642 Chestnut St',  '3395 Peanut Ct',
        '4182 Chestnut Dr'
      ]
                      }
    }, {});
  }
};
