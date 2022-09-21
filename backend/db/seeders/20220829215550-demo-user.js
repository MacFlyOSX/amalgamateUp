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
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]:
        ['garebear', 'damitsalex', 'kernersanders', 'vienbean', 'supremeleader'] }
    }, {});
  }
};
