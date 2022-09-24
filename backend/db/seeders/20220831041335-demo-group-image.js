'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: 'https://this.deakin.edu.au/wp-content/uploads/2018/04/brooke-cagle-609873-unsplash.jpg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://paintingwithatwistfranchise.com/wp-content/uploads/2020/03/9DSC_5421.jpg',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://promoambitions.com/wp-content/uploads/2019/05/Business-Networking-Events-1.jpg',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
