'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: 'https://www.meetup.com/blog/wp-content/uploads/2021/12/career-event_meetup-tech-groups-edited.jpeg',
        preview: true
      },
      {
        groupId: 1,
        url: 'https://www.meetup.com/blog/wp-content/uploads/2021/12/tech-networking-event_meetup-tech-groups-1120x630.jpg',
        preview: false
      },
      {
        groupId: 2,
        url: 'https://static.wixstatic.com/media/d1b61d_af134a17f1a748dfa519d8d524ad4a1c~mv2.jpg/v1/fill/w_640,h_480,fp_0.52_0.39,q_80,usm_0.66_1.00_0.01,enc_auto/d1b61d_af134a17f1a748dfa519d8d524ad4a1c~mv2.jpg',
        preview: true
      },
      {
        groupId: 2,
        url: 'https://www.discoverlancaster.com/imager/assets_simpleviewinc_com/simpleview/image/upload/crm/discoverlancaster/PaintingwithaTwist_MainPhoto0-088035345056a36_0880362a-5056-a36a-09deb568fc683ff4_8ef7ea6302ebfbef14fae837bb7b9c7d.jpg',
        preview: false
      },
      {
        groupId: 3,
        url: 'https://bestcorporateevents.com/app/uploads/2014/09/Group-have-fun-painting.jpg',
        preview: true
      },
      {
        groupId: 3,
        url: 'https://t3.ftcdn.net/jpg/01/08/45/04/360_F_108450492_hsoZH459ezGI12KKyGmVi72zOBKCYuq5.jpg',
        preview: false
      },
      {
        groupId: 4,
        url: 'https://paintingwithatwistfranchise.com/wp-content/uploads/2020/03/9DSC_5421.jpg',
        preview: true
      },
      {
        groupId: 4,
        url: 'https://paintingwithatwistfranchise.com/wp-content/uploads/2020/02/banner-images.jpg',
        preview: false
      },
      {
        groupId: 5,
        url: 'https://promoambitions.com/wp-content/uploads/2019/05/Business-Networking-Events-1.jpg',
        preview: true
      },
      {
        groupId: 5,
        url: 'https://www.nextinsurance.com/wp-content/uploads/2020/09/sep-2020-11-802x454.jpg',
        preview: false
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
