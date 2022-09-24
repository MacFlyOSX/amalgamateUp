'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [
      {
        organizerId: 3,
        name: 'SGV LA + OC Chinese & Global Foodies',
        about: "Let's Eat the World! While our prime focus will be Chinese restaurants in the San Gabriel Valley (from the 710 Freeway to the West, the 60 Freeway to the South, 210 Freeway to the North, and the 57 Freeway to the East), we will venture all over the LA and OC counties as well as parts beyond. We will also explore global cuisines from Japanese to Sri Lankan to Nigerian to French and more.\n" +

          '\n' +
          'Be prepared to share the dishes family-style, as most events will be designated as Family Style Dining. However, there will be occasions where each individual will order their own entree/main dish. Be sure to bring cash, as many hole-in-the-wall places do not accept credit cards.',
        type: 'In person',
        private: undefined,
        city: 'Monterey Park',
        state: 'CA'
      },
      {
        organizerId: 4,
        name: 'New Parents New Kids',
        about: 'This is a meetup group for anyone new to parenting or not so new to parenting but looking to connect with others.',
        type: 'In person',
        private: undefined,
        city: 'New York',
        state: 'NY'
      },
      {
        organizerId: 2,
        name: 'Eastside Drunken Knitters',
        about: "Join us for social knitting and drinking on the East side of LA! We'll make new friends and have a great time, all while exploring neighborhood pubs and supporting each other in our yarn and booze addictions. ;) Might be a good idea to bring your simple projects, and leave the lace knitting at home. We'll have a mix of daytime and evening meetups (it's five o'clock somewhere). Come KIP with us!",
        type: 'In person',
        private: undefined,
        city: 'Los Angeles',
        state: 'CA'
      },
      {
        organizerId: 6,
        name: 'Long Beach CoEd Soccer',
        about: 'This Coed Soccer Meetup Group (Beginner Friendly) is designed to organize and schedule regular pickup soccer matches in the Long Beach and Surrounding Cities.\n' +

          '\n' +
          'The focus is on having fun and providing the opportunity to enjoy the game with others. The initial plan is to find others interested in playing locally, and perhaps starting a team or connecting players with teams that are looking for players. Our members take priority over non-members or guest for reserved fields.',
        type: 'In person',
        private: undefined,
        city: 'Long Beach',
        state: 'CA'
      },
      {
        organizerId: 3,
        name: 'Blktivity - Black people sharing experiences',
        about: `Blktivity is all about black people that consider themselves activity based! Ever wanted to do something but didn't have anyone that was "into that?" If you're looking for people that are willing to try anything once as long as it's not going to kill you (not guaranteed) this is the place! Blacktivities is about doing! Thinking can come later.`,
        type: 'In person',
        private: undefined,
        city: 'Brooklyn',
        state: 'NY'
      },
      {
        organizerId: 5,
        name: 'Ladies Just Wanna Have Fun',
        about: 'Have you always wanted a great group of friends to do things with? We do everything from concerts, road trips, hiking, rock climbing, dancing, karaoke, to a nice dinner and drinks, 🍷etc\n' +
          '\n' +
          'Lets chat about our lives, principles, concepts, positive things to do, share experiences and cheer each other‘s triumphs, and support each other in our trials. Girlfriend time heals the soul.',
        type: 'In person',
        private: undefined,
        city: 'Salt Lake City',
        state: 'UT'
      },
      {
        organizerId: 5,
        name: 'The Seattle Poker Meetup Group',
        about: 'The Seattle Poker Meetup Group is a private group that plays adults-only no-rake, no-fee home poker games in the Seattle area. Limits are low, games are in private homes, persons under 21 years old are not allowed to join or play. Our organization and our games are purely non-commercial. Founded in 2006, we have had thousands of successful, fun, non-commercial poker games.',
        type: 'In person',
        private: undefined,
        city: 'Seattle',
        state: 'WA'
      },
      {
        organizerId: 4,
        name: 'Portland Golf Club',
        about: 'Remember that first shot that went high and straight? That feeling of a pure golf shot? Well, we long for those moments more often. We love to get a birdy but a double or triple is not that uncommon.\n' +
          '\n' +
          "We don't take golf too seriously. We hack around, have fun, enjoy the weather when it's nice out, and have no qualms about golfing in the rain. We move along at a 'ready play' pace and enjoy the company.",
        type: 'In person',
        private: undefined,
        city: 'Portland',
        state: 'OR'
      },
      {
        organizerId: 2,
        name: 'The 45+ Supper Club',
        about: 'Once a month (or whenever the mood strikes us), adults will come together at a local restaurant to enjoy good food and great conversations.\n' +
          '\n' +
          'Our choices will be wide ranging from fine dining to casual. We comb the annals of reviews to find you to the nicest, newest and/or most awarded establishments that exist in our amazing food community here in Phoenix. We are incredibly lucky to enjoy so much culinary talent in our city!',
        type: 'In person',
        private: undefined,
        city: 'Phoenix',
        state: 'AZ'
      },
      {
        organizerId: 6,
        name: 'Tallahassee Pickle Ball Meetup Group',
        about: 'Anyone who plays or wants to learn pickle ball, come on in! Starting with first-timers and beginners.\n' +
          '\n' +
          'Pickle ball is social, unlike tennis.',
        type: 'In person',
        private: undefined,
        city: 'Tallahassee',
        state: 'FL'
      },
      {
        organizerId: 5,
        name: 'Eagle Riders Motorcycle Club of Las Vegas',
        about: 'We are a Las Vegas based, family-oriented motorcycle club. We are a group of motorcycle enthusiasts who enjoy frequent group rides, fun activities, community and charity support, and camaraderie among friends and family within our club. Our motorcycle club is open to male and female riders, riders of every ethnicity, riders of all brands and styles of motorcycles, and people from many different walks of life of all age groups. We are a prospecting club and we take great pride in how we organize and maintain a high level of safety standards for our members and guests of our rides. We average over 100 rides per year, both short and full-day rides as well as many overnight rides to further destinations and, of course, we always plan rides to some of the major motorcycle rallies like Sturgis, Reno Street Vibrations, and more. We always welcome guests to tag along for many of our rides so for more information on how to join us on future rides and activities through southern Nevada and the surrounding areas, or for membership rules to join our club, please visit our website at www.eagleridersmclv.com.',
        type: 'In person',
        private: undefined,
        city: 'Las Vegas',
        state: 'NV'
      },
      {
        organizerId: 3,
        name: 'Young, Wild and Fun Socials of Central Florida',
        about: "The goal of the group is to bring people (20's, 30's, 40's) of different communities and cultures together to build friendships. The group will consist of social and active events. Be on the lookout for Meetups throughout the week and the weekend. (:\n" +
          '\n' +
          'P.S. If someone in the group makes you uncomfortable with any messages, comments. Please let me know. I will not tolerate that behavior.',
        type: 'In person',
        private: undefined,
        city: 'Orlando',
        state: 'FL'
      },
      {
        organizerId: 6,
        name: 'ALPINE Outdoors Club: Hiking | Desi | Adventures',
        about: 'Alpine Outdoors Club is a friendly community of enthusiasts who enjoy outdoor activities, appreciate nature, and have fun together. The goal is to be active, fit, and maintain a healthy lifestyle. Activities include hiking, biking, camping, kayaking, golfing, etc. There will be a variety of activities that may range from easy, intermediate, to strenuous. We also organize events to conserve nature by doing trail maintenance. Expect several weekly events posted and all year round including winter which is also a great time to be outdoors. There will be trips organized from time to time to explore national parks and international trekking adventures. Guidance can be provided to anyone needing advice on developing outdoor skills, hiking gear, etc. The organizers have the right to remove any member from the group due to inactivity (over 3 months) or any other reasons at discretion. All skill levels are welcome.',
        type: 'In person',
        private: undefined,
        city: 'Secaucus',
        state: 'NJ'
      },
      {
        organizerId: 4,
        name: 'Dungeons & Dragons 5E for Beginners+',
        about: "Welcome to Dungeons & Dragons 5E for Beginners +, a group dedicated to learning how to play D&D together. I've started this group because I would like to learn how to be a Dungeon Master, and I hope that anyone interested in learning the game will join me. All levels are welcome, as long as you are aware that sessions might be a little rough around the edges as we get started learning the ropes.",
        type: 'In person',
        private: undefined,
        city: 'San Diego',
        state: 'CA'
      },
      {
        organizerId: 2,
        name: 'Speed Dating - Dallas Meetups',
        about: 'The Speed Dating Meetup is meant for singles who are interested in meeting new people in a structured format. Whether you are recently single, new in town, or have been single for a while, this group is for you.\n' +
          'The Meetup will host a variety of location and interest-based speed dating events! The Meetup is for all ages and backgrounds.\n' +
          'Online Speed Dating events will be hosted on The Fun Singles (https://thefun.singles/dallas). In person Speed Dating events will be hosted at one of the classy venues in Dallas.\n' +
          "Join this singles group and let's build a great meetup community!",
        type: 'In person',
        private: undefined,
        city: 'Dallas',
        state: 'TX'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups', {
      where: { name: [
        'SGV LA + OC Chinese & Global Foodies',
        'New Parents New Kids',
        'Eastside Drunken Knitters',
        'Long Beach CoEd Soccer',
        'Blktivity - Black people sharing experiences',
        'Ladies Just Wanna Have Fun',
        'The Seattle Poker Meetup Group',
        'Portland Golf Club',
        'The 45+ Supper Club',
        'Tallahassee Pickle Ball Meetup Group',
        'Eagle Riders Motorcycle Club of Las Vegas',
        'Young, Wild and Fun Socials of Central Florida',
        'ALPINE Outdoors Club: Hiking | Desi | Adventures',
        'Dungeons & Dragons 5E for Beginners+',
        'Speed Dating - Dallas Meetups'
      ] }
    }, {});
  }
};
