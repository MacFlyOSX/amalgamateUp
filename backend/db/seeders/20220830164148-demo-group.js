'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [
      {
        organizerId: 2,
        name: 'Tech Overflow of Lincoln',
        about: "We are a community of developers prepping for coding interviews, participating in hackathons, building portfolio projects, and attending software engineering panels TOGETHER. No coder is an island, and you don't have to be one either.\n" +
          '\n' +
          "In the past we've had App Academy, Codesmith, Fullstack Academy, Grace Hopper, Flatiron, New York Code + Design, General Assembly++ grads sit alongside our self-taught programmers and computer science majors to hack at projects, crack algos, and speak to software engineers from companies like Coinbase and Bloomberg.",
        type: 'In person',
        private: false,
        city: 'Lincoln',
        state: 'NE'
      },
      {
        organizerId: 1,
        name: 'Tipsy Painters of Springfield',
        about: 'Tipsy Painters is a traveling painting party that is hosted out-of-doors and indoors at various venue locations. Our indoor venues include bars, lounges, casual restaurants as well as private homes and corporate offices. Our outdoor painting takes place in parks during the spring, summer and fall.\n' +
          '\n' +
          'Our class is wonderful for all ages and all levels- beginners through advanced! Attendees learn the basics of painting ~ mixing, shading and blending all the while enjoying a social experience. As they work, our students can enjoy a beverage and some snacks.',
        type: 'In person',
        private: true,
        city: 'Springfield',
        state: 'IL'
      },
      {
        organizerId: 2,
        name: 'Tipsy Painters of Carson City',
        about: 'Tipsy Painters is a traveling painting party that is hosted out-of-doors and indoors at various venue locations. Our indoor venues include bars, lounges, casual restaurants as well as private homes and corporate offices. Our outdoor painting takes place in parks during the spring, summer and fall.\n' +
          '\n' +
          'Our class is wonderful for all ages and all levels- beginners through advanced! Attendees learn the basics of painting ~ mixing, shading and blending all the while enjoying a social experience. As they work, our students can enjoy a beverage and some snacks.',
        type: 'In person',
        private: false,
        city: 'Carson City',
        state: 'NV'
      },
      {
        organizerId: 3,
        name: 'Tipsy Painters of Columbia',
        about: 'Tipsy Painters is a traveling painting party that is hosted out-of-doors and indoors at various venue locations. Our indoor venues include bars, lounges, casual restaurants as well as private homes and corporate offices. Our outdoor painting takes place in parks during the spring, summer and fall.\n' +
          '\n' +
          'Our class is wonderful for all ages and all levels- beginners through advanced! Attendees learn the basics of painting ~ mixing, shading and blending all the while enjoying a social experience. As they work, our students can enjoy a beverage and some snacks.',
        type: 'In person',
        private: false,
        city: 'Columbia',
        state: 'SC'
      },
      {
        organizerId: 1,
        name: 'Pursuit of HAPPYness of Oklahoma City',
        about: "MEET AND GROW RICH! This is also a club where we meet to talk about money making opportunities, to share GENUINE opportunities and to help out each other's businesses!\n" +
          'Inclusivity and mutual support is what this is all about! Whether you are a veteran business builder or someone just starting out and exploring options or simply wanting to meet and have a drink from time to time, WELCOME!',
        type: 'In person',
        private: true,
        city: 'Oklahoma City',
        state: 'OK'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups', {
      where: { name: ['Tech Overflow of Lincoln',
                        'Tipsy Painters of Springfield',
                        'Tipsy Painters of Carson City',
                        'Tipsy Painters of Columbia',
                        'Pursuit of HAPPYness of Oklahoma City'] }
    }, {});
  }
};
