'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: 'https://engineering.indeedblog.com/wp-content/uploads/2014/04/20131014_UT_CodingDuel.jpg',
        preview: true
      },
      {
        eventId: 2,
        url: 'https://cdn-az.allevents.in/events9/banners/8c4caacbc2645bae079fe9c7ac15a25dc5c39bc7ad963f121bd5c962beccb70f-rimg-w816-h625-gmir.jpg',
        preview: true
      },
      {
        eventId: 3,
        url: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/frisco/new_years_eve_party_2644e653-2086-40e3-8e48-231c8f3e1ea9.jpg',
        preview: true
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
