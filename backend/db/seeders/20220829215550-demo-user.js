'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Gary',
        lastName: 'Song',
        email: 'garebear@user.io',
        username: 'garebear',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Alex',
        lastName: 'Dam',
        email: 'damitsalex@user.io',
        username: 'damitsalex',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Noah',
        lastName: 'Kerner',
        email: 'kernersanders@user.io',
        username: 'kernersanders',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Amanda',
        lastName: 'Vien',
        email: 'vienbean@user.io',
        username: 'vienbean',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'David',
        lastName: 'Rogers',
        email: 'supremeleader@user.io',
        username: 'supremeleader',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Adam',
        lastName: 'Selki',
        email: 'AdamSelki@user.io',
        username: 'adamselki',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Aijia',
        lastName: 'Wang',
        email: 'AijiaWang@user.io',
        username: 'aijiawang',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Alexander',
        lastName: 'Klivecka',
        email: 'AlexanderKlivecka@user.io',
        username: 'alexanderklivecka',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Andrea',
        lastName: 'Wu',
        email: 'AndreaWu@user.io',
        username: 'andreawu',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Brandon',
        lastName: 'Tasaki',
        email: 'BrandonTasaki@user.io',
        username: 'brandontasaki',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Christopher',
        lastName: 'Pannella',
        email: 'ChristopherPannella@user.io',
        username: 'christopherpannella',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jacob',
        lastName: 'Lamar',
        email: 'JacobLamar@user.io',
        username: 'jacoblamar',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jae',
        lastName: 'Hwang',
        email: 'JaeHwang@user.io',
        username: 'jaehwang',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jake',
        lastName: 'Matillano',
        email: 'JakeMatillano@user.io',
        username: 'jakematillano',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'James',
        lastName: 'Lee',
        email: 'JamesLee@user.io',
        username: 'jameslee',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jason',
        lastName: 'Kong',
        email: 'JasonKong@user.io',
        username: 'jasonkong',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jason',
        lastName: 'Arnold',
        email: 'JasonArnold@user.io',
        username: 'jasonarnold',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jessie',
        lastName: 'Baron',
        email: 'JessieBaron@user.io',
        username: 'jessiebaron',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Joanna',
        lastName: 'Gilbert',
        email: 'JoannaGilbert@user.io',
        username: 'joannagilbert',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'John',
        lastName: 'Carrera',
        email: 'JohnCarrera@user.io',
        username: 'johncarrera',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Logan',
        lastName: 'Seals',
        email: 'LoganSeals@user.io',
        username: 'loganseals',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Keerthana',
        lastName: 'Yellapragada',
        email: 'KeerthanaYellapragada@user.io',
        username: 'keerthanayellapragada',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Kyle',
        lastName: 'Kassen',
        email: 'KyleKassen@user.io',
        username: 'kylekassen',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Michael',
        lastName: 'Jung',
        email: 'MichaelJung@user.io',
        username: 'michaeljung',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Na',
        lastName: 'Chen',
        email: 'NaChen@user.io',
        username: 'nachen',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Samuel',
        lastName: 'Suh',
        email: 'SamuelSuh@user.io',
        username: 'samuelsuh',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Schaeffer',
        lastName: 'Ahn',
        email: 'SchaefferAhn@user.io',
        username: 'schaefferahn',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sean',
        lastName: 'Kennedy',
        email: 'SeanKennedy@user.io',
        username: 'seankennedy',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Yasamine',
        lastName: 'Cruz',
        email: 'YasamineCruz@user.io',
        username: 'yasaminecruz',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Yasha',
        lastName: 'Yang',
        email: 'YashaYang@user.io',
        username: 'yashayang',
        password: bcrypt.hashSync('password')
      },
      {
        firstName: 'Yibo',
        lastName: 'Guo',
        email: 'YiboGuo@user.io',
        username: 'yiboguo',
        password: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]:
      ['garebear', 'damitsalex', 'kernersanders',
      'vienbean',              'supremeleader',
      'adamselki',             'aijiawang',
      'alexanderklivecka',     'andreawu',
      'brandontasaki',         'christopherpannella',
      'jacoblamar',            'jaehwang',
      'jakematillano',         'jameslee',
      'jasonkong',             'jasonarnold',
      'jessiebaron',           'joannagilbert',
      'johncarrera',           'loganseals',
      'keerthanayellapragada', 'kylekassen',
      'michaeljung',           'nachen',
      'samuelsuh',             'schaefferahn',
      'seankennedy',           'yasaminecruz',
      'yashayang',             'yiboguo'] }
    }, {});
  }
};
