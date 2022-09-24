'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        venueId: 1,
        groupId: 1,
        name: 'Coding Competition Day - All skill levels welcome!',
        description: 'Put your skills to the test as you work your way through multiple rounds of algorithmic puzzles for the title of Bay Area Tech Overflow Champ. There will be 3 different brackets where entrants will be placed depending on their skill level. Come have fun!',
        type: 'In person',
        capacity: 100,
        price: 20,
        startDate: "2023-04-20 12:00:00",
        endDate: "2023-04-20 20:00:00"
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Tipsy Painting Party!!',
        description: 'Join us at the local watering hole, as we learn how to paint a beautiful self-portrait while enjoying some delicious wine! Bring your friends, family, etc. It will just be a great time.',
        type: 'In person',
        capacity: 20,
        price: 40,
        startDate: "2023-02-28 20:00:00",
        endDate: "2023-02-28 23:00:00"
      },
      {
        venueId: 3,
        groupId: 3,
        name: `New Year's Celebration!`,
        description: 'Join us as we close out the year and start the New Year with new friends!',
        type: 'In person',
        capacity: 50,
        price: 50,
        startDate: "2022-12-31 21:00:00",
        endDate: "2023-01-01 02:00:00"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      name: { [Op.in]: ['Coding Competition Day - All skill levels welcome!',
                        'Tipsy Painting Party!!',
                        `New Year's Celebration!`] }
    }, {});
  }
};
