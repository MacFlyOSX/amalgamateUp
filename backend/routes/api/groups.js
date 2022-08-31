// backend/routes/api/groups.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group, User, Membership, Venue, sequelize } = require('../../db/models');
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

});

/*
Get all Events for a Group by their ID
    /api/groups/:groupId/events
*/
router.get('/:groupId/events', async (req, res) => {

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
                            attributes: []}],
                attributes: {
                    include: [
                        [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"]
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
    const group = await Group.findByPk(req.params.groupId, {
        include: [
            {model: User,
                as: 'Organizer'},
            {model: Venue
            }]
    });
    if (group) {
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
        include: [ {model: Membership,
                    attributes: [] }],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"]
            ]
        },
        group: ['Group.id']
    });
    const { user } = req;
    console.log(user.id);
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
