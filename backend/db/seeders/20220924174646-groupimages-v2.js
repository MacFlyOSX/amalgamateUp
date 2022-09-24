'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroupImages', [
      { groupId: 4, url: 'https://i.imgur.com/OMwTYGZ.png', preview: true },
      {
        groupId: 5,
        url: 'https://www.baby-chick.com/wp-content/uploads/2018/11/Little-child-foot-in-parents-palms-518622486_1338x787.jpeg',
        preview: true
      },
      { groupId: 6, url: 'https://i.imgur.com/fVm2wvt.png', preview: true },
      {
        groupId: 7,
        url: 'https://www.montgomerycountymd.gov/rec/Resources/Images/adultsoccer.jpg',
        preview: true
      },
      { groupId: 8, url: 'https://i.imgur.com/d9qiVPd.png', preview: true },
      {
        groupId: 9,
        url: 'https://fatmumslim.com.au/wp-content/uploads/2018/05/Stocksy_txpb761474faZw100_Small_476001.jpg',
        preview: true
      },
      {
        groupId: 10,
        url: 'https://www.telegraph.co.uk/content/dam/betting/Better-Collective/8-Classic.jpg',
        preview: true
      },
      {
        groupId: 11,
        url: 'https://igp.brightspotcdn.com/dims4/default/ca50d51/2147483647/strip/true/crop/2400x1166+0+92/resize/1926x936!/quality/90/?url=http%3A%2F%2Findigogolf-brightspot.s3.amazonaws.com%2Fclubs%2Fe0%2Fab%2Fc77e5bf546609ab5bbaa0efeaa6b%2Ftamarack-golf-course.jpg',
        preview: true
      },
      {
        groupId: 12,
        url: 'https://i0.wp.com/www.differencebetween.com/wp-content/uploads/2010/12/Dinner_Difference-Between-Dinner-and-Supper.jpg',
        preview: true
      },
      {
        groupId: 13,
        url: 'https://www.ussportscamps.com/media/images/pickleball/tips/what-is-pickleball-group-rally.jpg',
        preview: true
      },
      {
        groupId: 14,
        url: 'https://www.eagleridersmclv.com/wp-content/uploads/2018/11/eagle-riders-logo-small-white.jpg',
        preview: true
      },
      {
        groupId: 15,
        url: 'https://siwi.org/wp-content/uploads/2021/07/why-water_cross-cutting-issues_youth-empowerment.jpg',
        preview: true
      },
      {
        groupId: 16,
        url: 'https://i.imgur.com/N5zAYu4.png',
        preview: true
      },
      {
        groupId: 17,
        url: 'https://myotakuworld.com/wp-content/uploads/2022/01/dungeonsanddragons.jpg',
        preview: true
      },
      {
        groupId: 18,
        url: 'https://www.thelist.com/img/gallery/things-you-should-never-do-while-speed-dating/intro-1582313316.jpg',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
