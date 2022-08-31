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
Get all Venues for a Group by their ID
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
Get all Events for a Group by their ID
    /api/groups/:groupId/events
*/
router.get('/:groupId/events', async (req, res) => {
    const group = await Group.findByPk(req.params.groupId);
    if (group) {
        const events = await Event.findAll({
            attributes: {
                include: ['id', 'groupId', 'venueId', 'name', 'type',
                          'startDate', 'endDate']
            },
            where: {
                groupId: req.params.groupId
            },
            include: [{model: Group,
                        attributes: {
                            exclude: ['organizerId', 'about', 'type', 'private', 'createdAt', 'updatedAt']
                        }}, {model: Venue,
                            attributes: {
                                exclude: ['groupId', 'address', 'lat', 'lng', 'createdAt', 'updatedAt']
                            }},],
            group: 'Event.id'
        });
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
Get all Members of a Group by their ID
    /api/groups/:groupId/members
*/
router.get('/:groupId/members', async (req, res) => {

});


/*
Get all Groups joined or organized by the Current User
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
                include: [ {model: Membership,
                            where: {
                                userId: user.id
                            },
                            attributes: []},
                            {model: GroupImage,
                            attributes: []}],
                attributes: {
                    include: [
                        [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
                        [sequelize.col('GroupImages.url', sequelize.where(sequelize.col('GroupImages.preview'), true)), 'previewImage']
                    ]
                },
                group: ['Group.id']
            });
            res.json(groups);
        } else return res.json({});
    }
);


/*
Get details of a Group from their ID
    /api/groups/:groupId
*/
router.get('/:groupId', async (req, res) => {
    let group = await Group.findByPk(req.params.groupId, {
        include: [
            {model: GroupImage,
                attributes: {
                    exclude: ['groupId', 'createdAt', 'updatedAt']
                }},
            {model: User,
                as: 'Organizer'},
            {model: Venue,
                as: 'Venues',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {model: Membership,
                attributes: [] }],
        // raw: true,
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
            ]
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
    if (group) {
        group = group.toJSON();
        group.numMembers = count;
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
Get all Groups
    /api/groups
*/
router.get('/', async (req, res) => {
    const groups = await Group.findAll({
        raw: true,
        include: [ {model: Membership,
                    attributes: [] },
                    {model: GroupImage,
                    attributes: []}
                ],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],
                [sequelize.col('GroupImages.url', sequelize.where(sequelize.col('GroupImages.preview'), true)), 'previewImage']
            ]
        },
        group: ['Group.id']
    });
    const counts = await Group.findAll({
        raw: true,
        include: [ {model: Membership,
                    attributes: [] }
                ],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"]
            ]
        },
        group: ['Group.id']
    });
    // console.log(counts);
    // console.log(groups);
    for (let i = 0; i < counts.length; i++) {
        groups[i].numMembers = counts[i].numMembers;
    }
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

});

/*
Delete a group by their ID
    /api/groups/:groupId
*/
router.delete('/:groupId', async(req, res) => {

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
