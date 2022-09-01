// ********************* groups.js ************************

/*
raw: true,
        include: [ {model: Membership,
                    attributes: [] },
                    {model: GroupImage,
                    attributes: []}
                ],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
                [sequelize.col('GroupImages.url'), 'previewImage']
            ]
        },
        group: 'Memberships.groupId'
*/


// line 53:
            // attributes: {
            //     include: ['id', 'groupId', 'venueId', 'name', 'type',
            //               'startDate', 'endDate']
            // },

// line 66:
            // include: [{model: Group,
            //             attributes: {
            //                 exclude: ['organizerId', 'about', 'type', 'private', 'createdAt', 'updatedAt']
            //             }}, {model: Venue,
            //                 attributes: {
            //                     exclude: ['groupId', 'address', 'lat', 'lng', 'createdAt', 'updatedAt']
            //                 }},],
            // group: 'Event.id'

// line 173:
            // const groups = await User.findByPk(user.id, {
            //     attributes: [],
            //     include: [{model: Group,
            //                through: {model: Membership,
            //                          attributes: []},
            //                         }]
            //     });

// line 181:
                            // {model: GroupImage,
                            // attributes: []}

// line 186:
                        // [sequelize.col('GroupImages.url', sequelize.where(sequelize.col('GroupImages.preview'), true)), 'previewImage']

// line 220:
            // {model: GroupImage,
            //     attributes: {
            //         exclude: ['groupId', 'createdAt', 'updatedAt']
            //     }},
            // {model: User,
            //     as: 'Organizer'},
            // {model: Venue,
            //     as: 'Venues',
            //     attributes: {
            //         exclude: ['createdAt', 'updatedAt']
            //     }
            // },

// line 277:
        //             {model: GroupImage,
        //             attributes: []}
// line 287:
        // const counts = await Group.findAll({
        //     raw: true,
        //     include: [ {model: Membership,
        //                 attributes: [] }
        //             ],
        //     attributes: {
        //         include: [
        //             [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"]
        //         ]
        //     },
        //     group: ['Group.id']
        // });

// line 287:
        //         [sequelize.col('GroupImages.url', sequelize.where(sequelize.col('GroupImages.preview'), true)), 'previewImage']

// line 290:
        // groups[i].numMembers = counts[i].numMembers;
        // console.log(groups[i].id)
