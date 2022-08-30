'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        venueId: 1,
        groupId: 1,
        name: 'First Meet and Greet',
        description: 'First meet and greet event! Join us online for happy times!',
        type: 'Online',
        capacity: 10,
        price: 18.50,
        startDate: "2021-11-19 20:00:00",
        endDate: "2021-11-19 22:00:00"
      },
      {
        venueId: 3,
        groupId: 2,
        name: 'First Meet & Greet',
        description: 'Join us online for happy times, and meet new folks!',
        type: 'Online',
        capacity: 10,
        price: 12.50,
        startDate: "2021-12-19 20:00:00",
        endDate: "2021-12-19 22:00:00"
      },
      {
        venueId: 5,
        groupId: 3,
        name: 'Meet and Greet for the First Time',
        description: 'Join us at the park for happy times, and meet new folks!',
        type: 'In person',
        capacity: 10,
        price: 8.50,
        startDate: "2021-12-21 20:00:00",
        endDate: "2021-12-21 22:00:00"
      },
      {
        venueId: 8,
        groupId: 4,
        name: 'Rager at the Ravine!',
        description: 'Join us at the Ravine for happy times, and dance the night away with new friends!',
        type: 'In person',
        capacity: 10,
        price: 20.00,
        startDate: "2021-12-29 20:00:00",
        endDate: "2021-12-29 22:00:00"
      },
      {
        venueId: 10,
        groupId: 5,
        name: `New Year's Celebration!`,
        description: 'Join us as we close out the year and start the New Year with new friends!',
        type: 'In person',
        capacity: 10,
        price: 32.75,
        startDate: "2021-12-31 20:00:00",
        endDate: "2022-01-01 02:00:00"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      name: { [Op.in]: ['Meet and Greet for the First Time','Rager at the Ravine!','First Meet and Greet','First Meet & Greet',`New Year's Celebration!`] }
    }, {});
  }
};
