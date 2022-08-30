// backend/routes/api/groups.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group, User, Membership, Venue, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
// const sequelize = require('sequelize');

const router = express.Router();


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

module.exports = router;
