'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: 'https://castlefordschools.files.wordpress.com/2020/09/meet-and-greet.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://www.rietveld.nl/wp-content/uploads/2017/02/Meet-and-Greet.jpg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://i.cbc.ca/1.5582233.1590271172!/cumulusImage/httpImage/image.jpg_gen/derivatives/16x9_780/trinity-bellwoods-park-on-saturday-toronto.jpg',
        preview: true
      },
      {
        eventId: 4,
        url: 'https://fastly.4sqi.net/img/general/600x600/Z9HDJ2aSiHKCE4ihcYgU47WO9VrO6wBIjfz20CEaFZc.jpg',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/frisco/new_years_eve_party_2644e653-2086-40e3-8e48-231c8f3e1ea9.jpg',
        preview: true
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
