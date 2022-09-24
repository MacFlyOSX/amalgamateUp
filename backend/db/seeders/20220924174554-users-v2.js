'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Adam',
        lastName: 'Selki',
        email: 'AdamSelki@user.io',
        username: 'adamselki',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Aijia',
        lastName: 'Wang',
        email: 'AijiaWang@user.io',
        username: 'aijiawang',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Alex',
        lastName: 'Klivecka',
        email: 'AlexKlivecka@user.io',
        username: 'alexklivecka',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Andrea',
        lastName: 'Wu',
        email: 'AndreaWu@user.io',
        username: 'andreawu',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Brandon',
        lastName: 'Tasaki',
        email: 'BrandonTasaki@user.io',
        username: 'brandontasaki',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Christopher',
        lastName: 'Pannella',
        email: 'ChristopherPannella@user.io',
        username: 'christopherpannella',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jacob',
        lastName: 'Lamar',
        email: 'JacobLamar@user.io',
        username: 'jacoblamar',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jae',
        lastName: 'Hwang',
        email: 'JaeHwang@user.io',
        username: 'jaehwang',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jake',
        lastName: 'Matillano',
        email: 'JakeMatillano@user.io',
        username: 'jakematillano',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'James',
        lastName: 'Lee',
        email: 'JamesLee@user.io',
        username: 'jameslee',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jason',
        lastName: 'Kong',
        email: 'JasonKong@user.io',
        username: 'jasonkong',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jason',
        lastName: 'Arnold',
        email: 'JasonArnold@user.io',
        username: 'jasonarnold',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jessie',
        lastName: 'Baron',
        email: 'JessieBaron@user.io',
        username: 'jessiebaron',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Joanna',
        lastName: 'Gilbert',
        email: 'JoannaGilbert@user.io',
        username: 'joannagilbert',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'John',
        lastName: 'Carrera',
        email: 'JohnCarrera@user.io',
        username: 'johncarrera',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Logan',
        lastName: 'Seals',
        email: 'LoganSeals@user.io',
        username: 'loganseals',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Keerthana',
        lastName: 'Yellapragada',
        email: 'KeerthanaYellapragada@user.io',
        username: 'keerthanayellapragada',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Kyle',
        lastName: 'Kassen',
        email: 'KyleKassen@user.io',
        username: 'kylekassen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Michael',
        lastName: 'Jung',
        email: 'MichaelJung@user.io',
        username: 'michaeljung',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Na',
        lastName: 'Chen',
        email: 'NaChen@user.io',
        username: 'nachen',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sam',
        lastName: 'Suh',
        email: 'SamSuh@user.io',
        username: 'samsuh',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Schaeffer',
        lastName: 'Ahn',
        email: 'SchaefferAhn@user.io',
        username: 'schaefferahn',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sean',
        lastName: 'Kennedy',
        email: 'SeanKennedy@user.io',
        username: 'seankennedy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Yasamine',
        lastName: 'Cruz',
        email: 'YasamineCruz@user.io',
        username: 'yasaminecruz',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Yasha',
        lastName: 'Yang',
        email: 'YashaYang@user.io',
        username: 'yashayang',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Yibo',
        lastName: 'Guo',
        email: 'YiboGuo@user.io',
        username: 'yiboguo',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]:
        [
          'adamselki',             'aijiawang',
      'alexklivecka',     'andreawu',
      'brandontasaki',         'christopherpannella',
      'jacoblamar',            'jaehwang',
      'jakematillano',         'jameslee',
      'jasonkong',             'jasonarnold',
      'jessiebaron',           'joannagilbert',
      'johncarrera',           'loganseals',
      'keerthanayellapragada', 'kylekassen',
      'michaeljung',           'nachen',
      'samsuh',             'schaefferahn',
      'seankennedy',           'yasaminecruz',
      'yashayang',             'yiboguo'
        ] }
    }, {});
  }
};
