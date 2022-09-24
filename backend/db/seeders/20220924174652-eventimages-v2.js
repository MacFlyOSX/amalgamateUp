'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 4,
        url: 'https://wp-media.petersons.com/blog/wp-content/uploads/2019/12/31125222/iStock-1125733916-2.jpg',
        preview: true
      },
      {
        eventId: 5,
        url: 'https://ccy.jfcs.org/app/uploads/2019/07/iStock-1072315292-article.jpg',
        preview: true
      },
      {
        eventId: 6,
        url: 'https://c8.alamy.com/comp/HXYDA3/outdoor-view-of-knitting-elements-such-as-knitting-yarn-and-needles-HXYDA3.jpg',
        preview: true
      },
      {
        eventId: 7,
        url: 'https://dt5602vnjxv0c.cloudfront.net/portals/8164/images/adult.jpg',
        preview: true
      },
      {
        eventId: 8,
        url: 'https://t3.ftcdn.net/jpg/02/68/61/42/360_F_268614235_YpcNlr7lTUI2AiUUDPwI8VgJd7hRbplz.jpg',
        preview: true
      },
      {
        eventId: 9,
        url: 'https://thumbs.dreamstime.com/b/five-women-white-morning-gowns-hangout-together-holding-glasses-champagne-enjoy-common-vacation-gathered-hotel-lux-room-193626043.jpg',
        preview: true
      },
      {
        eventId: 10,
        url: 'https://miro.medium.com/max/1200/1*EhjZcAb7CW85j3dMud0afQ.jpeg',
        preview: true
      },
      {
        eventId: 11,
        url: 'https://img-aws.ehowcdn.com/750x428p/photos.demandstudios.com/getty/article/165/34/76801952.jpg',
        preview: true
      },
      {
        eventId: 12,
        url: 'https://www.soundslikenashville.com/wp-content/uploads/2018/10/Copy-of-Southall_0054-1541087830-940x470.jpg',
        preview: true
      },
      {
        eventId: 13,
        url: 'https://media.npr.org/assets/img/2017/10/18/pickel_ball-1_wide-77dbe4cd4084132b22122aab3071bb0d498fb6c3.jpg',
        preview: true
      },
      {
        eventId: 14,
        url: 'https://i.pinimg.com/originals/ae/15/13/ae15135aba68b1188dd228d2d61400c8.jpg',
        preview: true
      },
      {
        eventId: 15,
        url: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX24579921.jpg',
        preview: true
      },
      {
        eventId: 16,
        url: 'https://as2.ftcdn.net/v2/jpg/02/17/16/11/1000_F_217161190_n0X4q3hQ1uau24HmvU96Gv8hHlZ8dlCH.jpg',
        preview: true
      },
      {
        eventId: 17,
        url: 'https://www.gannett-cdn.com/presto/2020/01/13/USAT/a2b26055-384d-4410-98e0-a57824f6823a-BS4A6681.jpg',
        preview: true
      },
      {
        eventId: 18,
        url: 'https://thumbs.dreamstime.com/b/diverse-people-sitting-cafe-drinking-coffee-talking-chatting-participating-speed-dating-young-men-women-having-fun-194892300.jpg',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // ON DELETE CASCADE
  }
};
