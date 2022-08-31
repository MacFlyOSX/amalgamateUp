'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: 'https://www.meetup.com/blog/wp-content/uploads/2021/12/career-event_meetup-tech-groups-edited.jpeg',
        preview: false
      }]);
  },

  async down (queryInterface, Sequelize) {
    //DELETE ON CASCADE
  }
};
