'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        venueId: 4,
        groupId: 4,
        name: 'Food and Fun with SGV LA + OC Foodies',
        description: "Let's Eat the World! While our prime focus will be Chinese restaurants in the San Gabriel Valley (from the 710 Freeway to the West, the 60 Freeway to the South, 210 Freeway to the North, and the 57 Freeway to the East), we will venture all over the LA and OC counties as well as parts beyond. We will also explore global cuisines from Japanese to Sri Lankan to Nigerian to French and more.\n" +

          '\n' +
          'Be prepared to share the dishes family-style, as most events will be designated as Family Style Dining. However, there will be occasions where each individual will order their own entree/main dish. Be sure to bring cash, as many hole-in-the-wall places do not accept credit cards.',
        type: 'In person',
        capacity: 20,
        price: 0,
        startDate: '2023-12-03 13:00:00',
        endDate: '2023-12-03 16:00:00'
      },
      {
        venueId: 5,
        groupId: 5,
        name: 'Meet with New Parents New Kids',
        description: 'This is a meetup group for anyone new to parenting or not so new to parenting but looking to connect with others.',
        type: 'In person',
        capacity: 20,
        price: 30,
        startDate: '2023-05-16 09:00:00',
        endDate: '2023-05-16 13:00:00'
      },
      {
        venueId: 6,
        groupId: 6,
        name: 'Food and Fun with Eastside Drunken Knitters',
        description: "Join us for social knitting and drinking on the East side of LA! We'll make new friends and have a great time, all while exploring neighborhood pubs and supporting each other in our yarn and booze addictions. ;) Might be a good idea to bring your simple projects, and leave the lace knitting at home. We'll have a mix of daytime and evening meetups (it's five o'clock somewhere). Come KIP with us!",
        type: 'In person',
        capacity: 20,
        price: 20,
        startDate: '2023-01-03 14:00:00',
        endDate: '2023-01-03 17:00:00'
      },
      {
        venueId: 7,
        groupId: 7,
        name: 'Hang out with Long Beach CoEd Soccer',
        description: 'This Coed Soccer Meetup Group (Beginner Friendly) is designed to organize and schedule regular pickup soccer matches in the Long Beach and Surrounding Cities.\n' +

          '\n' +
          'The focus is on having fun and providing the opportunity to enjoy the game with others. The initial plan is to find others interested in playing locally, and perhaps starting a team or connecting players with teams that are looking for players. Our members take priority over non-members or guest for reserved fields.',
        type: 'In person',
        capacity: 80,
        price: 20,
        startDate: '2023-05-23 18:00:00',
        endDate: '2023-05-23 21:00:00'
      },
      {
        venueId: 8,
        groupId: 8,
        name: 'Meet and Greet with Blktivity',
        description: `Blktivity is all about black people that consider themselves activity based! Ever wanted to do something but didn't have anyone that was "into that?" If you're looking for people that are willing to try anything once as long as it's not going to kill you (not guaranteed) this is the place! Blacktivities is about doing! Thinking can come later.`,
        type: 'In person',
        capacity: 20,
        price: 40,
        startDate: '2023-03-20 18:00:00',
        endDate: '2023-03-20 22:00:00'
      },
      {
        venueId: 9,
        groupId: 9,
        name: 'Hang out with Ladies Just Wanna Have Fun',
        description: 'Have you always wanted a great group of friends to do things with? We do everything from concerts, road trips, hiking, rock climbing, dancing, karaoke, to a nice dinner and drinks, 🍷etc\n' +

          '\n' +
          'Lets chat about our lives, principles, concepts, positive things to do, share experiences and cheer each other‘s triumphs, and support each other in our trials. Girlfriend time heals the soul.',
        type: 'In person',
        capacity: 100,
        price: 10,
        startDate: '2023-11-23 19:00:00',
        endDate: '2023-11-23 23:00:00'
      },
      {
        venueId: 10,
        groupId: 10,
        name: 'Food and Fun with The Seattle Poker Group',
        description: 'The Seattle Poker Meetup Group is a private group that plays adults-only no-rake, no-fee home poker games in the Seattle area. Limits are low, games are in private homes, persons under 21 years old are not allowed to join or play. Our organization and our games are purely non-commercial. Founded in 2006, we have had thousands of successful, fun, non-commercial poker games.',
        type: 'In person',
        capacity: 20,
        price: 30,
        startDate: '2023-02-11 17:00:00',
        endDate: '2023-02-11 22:00:00'
      },
      {
        venueId: 11,
        groupId: 11,
        name: 'BBQ with Portland Golf Club',
        description: 'Remember that first shot that went high and straight? That feeling of a pure golf shot? Well, we long for those moments more often. We love to get a birdy but a double or triple is not that uncommon.\n' +

          '\n' +
          "We don't take golf too seriously. We hack around, have fun, enjoy the weather when it's nice out, and have no qualms about golfing in the rain. We move along at a 'ready play' pace and enjoy the company.",
        type: 'In person',
        capacity: 80,
        price: 10,
        startDate: '2023-09-06 10:00:00',
        endDate: '2023-09-06 16:00:00'
      },
      {
        venueId: 12,
        groupId: 12,
        name: 'Get together with The 45+ Supper Club',
        description: 'Once a month (or whenever the mood strikes us), adults will come together at a local restaurant to enjoy good food and great conversations.\n' +

          '\n' +
          'Our choices will be wide ranging from fine dining to casual. We comb the annals of reviews to find you to the nicest, newest and/or most awarded establishments that exist in our amazing food community here in Phoenix. We are incredibly lucky to enjoy so much culinary talent in our city!',
        type: 'In person',
        capacity: 50,
        price: 10,
        startDate: '2023-03-14 17:00:00',
        endDate: '2023-03-14 19:00:00'
      },
      {
        venueId: 13,
        groupId: 13,
        name: 'Socialize with Tallahassee Pickle Ball',
        description: 'Anyone who plays or wants to learn pickle ball, come on in! Starting with first-timers and beginners.\n' +

          '\n' +
          'Pickle ball is social, unlike tennis.',
        type: 'In person',
        capacity: 60,
        price: 40,
        startDate: '2023-08-09 07:00:00',
        endDate: '2023-08-09 12:00:00'
      },
      {
        venueId: 14,
        groupId: 14,
        name: 'Food and Fun with Eagle Riders MCLV',
        description: 'We are a Las Vegas based, family-oriented motorcycle club. We are a group of motorcycle enthusiasts who enjoy frequent group rides, fun activities, community and charity support, and camaraderie among friends and family within our club. Our motorcycle club is open to male and female riders, riders of every ethnicity, riders of all brands and styles of motorcycles, and people from many different walks of life of all age groups. We are a prospecting club and we take great pride in how we organize and maintain a high level of safety standards for our members and guests of our rides. We average over 100 rides per year, both short and full-day rides as well as many overnight rides to further destinations and, of course, we always plan rides to some of the major motorcycle rallies like Sturgis, Reno Street Vibrations, and more. We always welcome guests to tag along for many of our rides so for more information on how to join us on future rides and activities through southern Nevada and the surrounding areas, or for membership rules to join our club, please visit our website at www.eagleridersmclv.com.',
        type: 'In person',
        capacity: 20,
        price: 50,
        startDate: '2023-10-22 15:00:00',
        endDate: '2023-10-22 19:00:00'
      },
      {
        venueId: 15,
        groupId: 15,
        name: 'Gather with Young, Wild and Fun Socials',
        description: "The goal of the group is to bring people (20's, 30's, 40's) of different communities and cultures together to build friendships. The group will consist of social and active events. Be on the lookout for Meetups throughout the week and the weekend. (:\n" +
          '\n' +
          'P.S. If someone in the group makes you uncomfortable with any messages, comments. Please let me know. I will not tolerate that behavior.',
        type: 'In person',
        capacity: 100,
        price: 40,
        startDate: '2023-12-14 20:00:00',
        endDate: '2023-12-14 23:00:00'
      },
      {
        venueId: 16,
        groupId: 16,
        name: 'Morning Hike with ALPINE Outdoors Club',
        description: 'Alpine Outdoors Club is a friendly community of enthusiasts who enjoy outdoor activities, appreciate nature, and have fun together. The goal is to be active, fit, and maintain a healthy lifestyle. Activities include hiking, biking, camping, kayaking, golfing, etc. There will be a variety of activities that may range from easy, intermediate, to strenuous. We also organize events to conserve nature by doing trail maintenance. Expect several weekly events posted and all year round including winter which is also a great time to be outdoors. There will be trips organized from time to time to explore national parks and international trekking adventures. Guidance can be provided to anyone needing advice on developing outdoor skills, hiking gear, etc. The organizers have the right to remove any member from the group due to inactivity (over 3 months) or any other reasons at discretion. All skill levels are welcome.',
        type: 'In person',
        capacity: 100,
        price: 40,
        startDate: '2023-01-03 05:00:00',
        endDate: '2023-01-03 12:00:00'
      },
      {
        venueId: 17,
        groupId: 17,
        name: 'Dungeons & Dragons Night',
        description: "Welcome to Dungeons & Dragons 5E for Beginners +, a group dedicated to learning how to play D&D together. I've started this group because I would like to learn how to be a Dungeon Master, and I hope that anyone interested in learning the game will join me. All levels are welcome, as long as you are aware that sessions might be a little rough around the edges as we get started learning the ropes.",
        type: 'In person',
        capacity: 60,
        price: 20,
        startDate: '2023-10-25 18:00:00',
        endDate: '2023-10-25 22:00:00'
      },
      {
        venueId: 18,
        groupId: 18,
        name: 'Speed Dating Night!',
        description: 'The Speed Dating Meetup is meant for singles who are interested in meeting new people in a structured format. Whether you are recently single, new in town, or have been single for a while, this group is for you.\n' +
          'The Meetup will host a variety of location and interest-based speed dating events! The Meetup is for all ages and backgrounds.\n' +
          'Online Speed Dating events will be hosted on The Fun Singles (https://thefun.singles/dallas). In person Speed Dating events will be hosted at one of the classy venues in Dallas.\n' +
          "Join this singles group and let's build a great meetup community!",
        type: 'In person',
        capacity: 100,
        price: 0,
        startDate: '2023-01-27 17:00:00',
        endDate: '2023-01-27 22:00:00'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      name: { [Op.in]: [
        'Food and Fun with SGV LA + OC Foodies',
        'Meet with New Parents New Kids',
        'Food and Fun with Eastside Drunken Knitters',
        'Hang out with Long Beach CoEd Soccer',
        'Meet and Greet with Blktivity',
        'Hang out with Ladies Just Wanna Have Fun',
        'Food and Fun with The Seattle Poker Group',
        'BBQ with Portland Golf Club',
        'Get together with The 45+ Supper Club',
        'Socialize with Tallahassee Pickle Ball',
        'Food and Fun with Eagle Riders MCLV',
        'Gather with Young, Wild and Fun Socials',
        'Morning Hike with ALPINE Outdoors Club',
        'Dungeons & Dragons Night',
        'Speed Dating Night!'
      ] }
    }, {});
  }
};
