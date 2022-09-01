// backend/routes/api/groups.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group, User, Membership, Venue, Event, Attendance, GroupImage, EventImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
// const sequelize = require('sequelize');

const router = express.Router();


// ********************* GET REQUESTS *************************

/*
Get all Venues for a Group by their ID ✅
    /api/groups/:groupId/venues
*/
router.get('/:groupId/venues', async (req, res) => {
    const group = await Group.findByPk(req.params.groupId);
    if (group) {
        const venues = await Venue.findAll({
            where: {
                groupId: req.params.groupId
            }
        });
        res.json({
            Venues: venues
        })
    } else {
        res.status(404);
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          });
    }

});
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
/*
Get all Events for a Group by their ID ✅
    /api/groups/:groupId/events
*/
router.get('/:groupId/events', async (req, res) => {
    const group = await Group.findByPk(req.params.groupId, {
        attributes: {
            exclude: ['organizerId', 'about', 'type', 'private', 'createdAt', 'updatedAt']
        }
    });
    if (group) {
        const events = await Event.findAll({
            raw: true,
            // attributes: {
            //     include: ['id', 'groupId', 'venueId', 'name', 'type',
            //               'startDate', 'endDate']
            // },
            where: {
                groupId: req.params.groupId
            },
            include: [ {model: Attendance,
                attributes: [] }
            ],
            attributes: {
                include: [
                    [sequelize.fn("COUNT", sequelize.col("Attendances.id")), "numAttending"]
                ]
            },
            group: ['Event.id']
            // include: [{model: Group,
            //             attributes: {
            //                 exclude: ['organizerId', 'about', 'type', 'private', 'createdAt', 'updatedAt']
            //             }}, {model: Venue,
            //                 attributes: {
            //                     exclude: ['groupId', 'address', 'lat', 'lng', 'createdAt', 'updatedAt']
            //                 }},],
            // group: 'Event.id'
        });
        // console.log(events);
        for (let i = 0; i < events.length; i++) {
            const numAttend = await Attendance.count({
                where: {
                    eventId: events[i].id
                }
            });
            events[i].numAttending = numAttend;
            const prevIm = await EventImage.findOne({
                raw: true,
                where: {
                    [Op.and]: [
                        {preview: true},
                        {eventId: events[i].id}
                    ]
                }
            });
            // console.log(prevIm);
            events[i].previewImage = prevIm.url;
            events[i].Group = group;
            const venue = await Venue.findByPk(events[i].venueId, {
                raw: true,
                attributes: {
                    exclude: ['groupId', 'address', 'lat', 'lng', 'createdAt', 'updatedAt']
                }
            });
            events[i].Venue = venue;
        }
        res.json({
            Events: events
        })
    } else {
        res.status(404);
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          });
    }
});

/*
Get all Members of a Group by their ID ✅
    /api/groups/:groupId/members
*/
router.get('/:groupId/members', async (req, res) => {
    const { user } = req;
    const group = await Group.findByPk(req.params.groupId, {raw:true});
    if (group) {
        let result = await User.findAll({
            raw: true,
            include: [{model: Membership,
                        where: {
                            groupId: req.params.groupId
                        },
                        attributes: []
                         }]
        });
        // const newResult = result.toJSON();
        console.log(result);
        let original = [];
        let limited = [];
        let cohost = [];
        for (let i = 0; i < result.length; i++) {
            const memStatus = await Membership.findOne({
                raw: true,
                where: {
                    userId: result[i].id,
                    groupId: req.params.groupId
                },
                attributes: ['status']
            });
            // console.log(memStatus);
            result[i].Membership = memStatus;
            original.push(result[i]);

            if (memStatus.status === 'co-host') {
                cohost.push(result[i].id)
            }
            if (memStatus.status !== 'pending') {
                limited.push(result[i])
            }
        }
        if (user.id === group.organizerId || cohost.includes(user.id)) {
            res.json({
                Members: original
            })
        } else {
            res.json({
                Members: limited
            })
        }
    } else {
        res.status(404);
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          });
    }

});


/*
Get all Groups joined or organized by the Current User ✅
    /api/groups/current
*/
router.get('/current', async (req, res) => {
    const { user } = req;
        if (user) {
            // const groups = await User.findByPk(user.id, {
            //     attributes: [],
            //     include: [{model: Group,
            //                through: {model: Membership,
            //                          attributes: []},
            //                         }]
            //     });
            const groups = await Group.findAll({
                raw: true,
                include: [ {model: Membership,
                            where: {
                                userId: user.id
                            },
                            attributes: []},
                            // {model: GroupImage,
                            // attributes: []}
                        ],
                attributes: {
                    include: [
                        [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
                        // [sequelize.col('GroupImages.url', sequelize.where(sequelize.col('GroupImages.preview'), true)), 'previewImage']
                    ]
                },
                group: ['Group.id']
            });
            for (let i = 0; i < groups.length; i++) {
                const count = await Membership.count({ where: { groupId: groups[i].id } });
                groups[i].numMembers = count;
                const images = await Group.findByPk(groups[i].id, {
                    raw: true,
                    include: [{
                                model: GroupImage,
                                where: {preview: true},
                                attributes: ['url']
                    }]
                });
                // console.log(images);
                // const prevIm = await Group.findByPk
                // console.log(prevIm);
                groups[i].previewImage = images['GroupImages.url'];
            }
            res.json({Groups:groups});
        } else return res.json({});
    }
);


/*
Get details of a Group from their ID ✅
    /api/groups/:groupId
*/
router.get('/:groupId', async (req, res) => {
    let group = await Group.findByPk(req.params.groupId, {
        include: [
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
            {model: Membership,
                attributes: [] }],
        // raw: true,
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
            ]
        },
        group: ['Group.id']
    });

    if (group) {
        group = group.toJSON();
        const organizer = await User.findByPk(group.organizerId, {
            raw: true,
            attributes: {
                include: ['id', 'firstName', 'lastName']
            }
        });
        const count = await Membership.count({
            where: {
                groupId: req.params.groupId
            }
        });
        const venues = await Venue.findAll({
            raw: true,
            where: {
                groupId: req.params.groupId
            }
        });
        const groupImages = await GroupImage.findAll({
            raw: true,
            where: {
                groupId: req.params.groupId
            }
        })
        group.numMembers = count;
        group.GroupImages = groupImages;
        group.Organizer = organizer;
        group.Venues = venues;
        res.json(group);
    } else {
        res.status(404);
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          });
    }
});

/*
Get all Groups ✅
    /api/groups
*/
router.get('/', async (req, res) => {
    const groups = await Group.findAll({
        raw: true,
        include: [ {model: Membership,
                    attributes: [] },
        //             {model: GroupImage,
        //             attributes: []}
                ],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
        //         [sequelize.col('GroupImages.url', sequelize.where(sequelize.col('GroupImages.preview'), true)), 'previewImage']
            ]
        },
        group: ['Group.id']
    });
    console.log(groups);
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
    // console.log(counts);
    // console.log(groups);
    for (let i = 0; i < groups.length; i++) {
        // groups[i].numMembers = counts[i].numMembers;
        // console.log(groups[i].id)
        const images = await Group.findByPk(groups[i].id, {
            raw: true,
            include: [{
                        model: GroupImage,
                        where: {preview: true},
                        attributes: ['url']
            }]
        });
        console.log(images);
        // console.log(images);
        // const prevIm = await Group.findByPk
        // console.log(prevIm);
        groups[i].previewImage = images['GroupImages.url'];
        // if (i === counts.length - 1) {
        //     res.json({
        //         Groups: groups
        //     })
        // }
    }
    // console.log(groups)
    res.json({
        Groups: groups
    });
});

// ********************* DELETE REQUESTS *************************

/*
Delete Membership to a Group by their ID
    /api/groups/:groupId/membership
*/
router.delete('/:groupId/membership', async(req, res) => {
    const {user} = req;
    if (user) {
        const group = await Group.findByPk(req.params.groupId);
        if (group) {
            const membership = await Membership.findOne({
                raw: true,
                where: {
                    [Op.and]: [
                        { userId: user.id },
                        { groupId: req.params.groupId }
                    ]
                }
            });
            // console.log(membership);
            if (membership) {
                const status = membership.status;
                if (status !== 'organizer') {
                    const membershipToDelete = await Membership.findOne({
                        where: {
                            [Op.and]: [
                                { userId: user.id },
                                { groupId: req.params.groupId }
                            ]
                        }
                    });
                    membershipToDelete.destroy();
                    res.json({
                        "message": "Successfully deleted membership from group"
                      });
                } else {
                    res.json({
                        message: 'Organizer cannot delete membership to the group'
                    })
                }
            } else {
                res.status(404);
                res.json({
                    "message": "Membership does not exist for this User",
                    "statusCode": 404
                  });
            }
        } else {
            res.status(404);
            res.json({
                "message": "Group couldn't be found",
                "statusCode": 404
              });
        }
    } else {
        res.status(401);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
          });
    }
});

/*
Delete a group by their ID ✅
    /api/groups/:groupId
*/
router.delete('/:groupId', async(req, res) => {
    const { user } = req;
    if (user) {
        const group = await Group.findByPk(req.params.groupId, {raw:true});
        // console.log(group.organizerId);
        // console.log(group.organizerId);
        // console.log(user.id)
        if (group.organizerId === user.id) {
            const groupToDestroy = await Group.findByPk(req.params.groupId);
            await groupToDestroy.destroy();
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
              });
        } else {
            res.status(404);
            res.json({
                "message": "Group couldn't be found",
                "statusCode": 404
              });
        }
    } else {
        res.status(401);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
          });
    }
});

// ********************* POST REQUESTS *************************

/*
Add an image to a Group by their ID
    /api/groups/:groupId/images
*/
router.post('/:groupId/images', async(req, res) => {

});

/*
Create a Venue for a Group by their ID
    /api/groups/:groupId/venues
*/
router.post('/:groupId/venues', async(req, res) => {

});

/*
Create an Event for a Group by their ID
    /api/groups/:groupId/events
*/
router.post('/:groupId/events', async(req, res) => {

});

/*
Request Membership for a Group by their ID
    /api/groups/:groupId/membership
*/
router.post('/:groupId/membership', async(req, res) => {

});

/*
Create a Group
    /api/groups
*/
router.post('/', async(req, res) => {

});

// ********************* PUT REQUESTS *************************

/*
Change the status of a Membership for a Group by their ID
    /api/groups/:groupId/membership
*/
router.put('/:groupId/membership', async(req, res) => {

});

/*
Edit a Group by their ID
    /api/groups/:groupId/membership
*/
router.put('/:groupId', async(req, res) => {

});

module.exports = router;
