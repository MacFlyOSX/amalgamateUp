// backend/routes/api/groups.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Group, User, Membership, Venue, Event, Attendance, GroupImage, EventImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

// ********************* GET REQUESTS *************************


/*
Get all Members ✅
    /api/groups/members
*/

router.get('/members', async (req, res) => {
    const memberList = await Membership.findAll({raw:true});
    const members= {};
    const pending = {};
    for (const ele of memberList) {
        const user = await User.findByPk(ele.userId, {raw:true});
        ele.name = `${user.firstName} ${user.lastName}`;
        if (ele.status === 'pending') {
            if (pending[ele.groupId]) pending[ele.groupId] = [...pending[ele.groupId], ele]
            else pending[ele.groupId] = [ele]
        } else {
            if (members[ele.groupId]) members[ele.groupId] = [...members[ele.groupId], ele]
            else members[ele.groupId] = [ele]
        }
    };
    res.json({members, pending});
})

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
Get all Events for a Group by their ID ✅
    /api/groups/:groupId/events
*/
router.get('/:groupId/events', async (req, res) => {
    const group = await Group.findByPk(req.params.groupId, {
        raw: true,
        attributes: {
            exclude: ['organizerId', 'about', 'type', 'private', 'createdAt', 'updatedAt']
        }
    });
    if (group) {
        const events = await Event.findAll({
            raw: true,

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

        });
        for (let i = 0; i < events.length; i++) {
            const startDate = {};
            const endDate = {};

            const start = new Date(events[i].startDate);
            const end = new Date(events[i].endDate);

            const startStr = start.toString();
            const endStr = end.toString();

            const startArr = startStr.split(' ');
            const endArr = endStr.split(' ');

            events[i].startDay = startArr[0];
            events[i].endDay = endArr[0];

            events[i].startDate = `${startArr[1]} ${startArr[2]}`;
            events[i].endDate = `${endArr[1]} ${endArr[2]}`;

            let startTime = startArr[4].slice(0,2);
            let endTime = endArr[4].slice(0,2);

            startTime = startTime > 12 ? `${startTime - 12}:${startArr[4].slice(3, 5)} PM` : `${startTime}:${startArr[4].slice(3, 5)} AM`;
            endTime = endTime > 12 ? `${endTime - 12}:${endArr[4].slice(3, 5)} PM` : `${endTime}:${endArr[4].slice(3, 5)} AM`;

            events[i].startTime = startTime;
            events[i].endTime = endTime;

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
            if (prevIm) {
                events[i].previewImage = prevIm.url;
            } else {
                events[i].previewImage = 'https://i.imgur.com/qfX30Dz.png';
            }
            events[i].Group = group;
            events[i].groupName = group.name;
            events[i].groupCity = group.city;
            events[i].groupState = group.state;

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
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId, {raw:true});
    if (group) {
        let result = await User.findAll({
            raw: true,
            include: [{model: Membership,
                        where: {
                            groupId
                        },
                        attributes: []
                         }]
        });
        console.log(result);
        let original = [];
        let limited = [];
        let cohost = [];
        for (let i = 0; i < result.length; i++) {
            let userId = result[i].id;
            const memStatus = await Membership.findOne({
                raw: true,
                where: {
                    userId: userId,
                    groupId
                },
                attributes: ['status']
            });
            result[i].Membership = memStatus;
            console.log(memStatus);
            original.push(result[i]);

            if (memStatus.status === 'co-host') {
                cohost.push(userId)
            }
            if (memStatus.status !== 'pending') {
                limited.push(result[i])
            }
        }
        if (!user) {
            res.json({
                Members: limited
            })
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
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

            const groups = await Group.findAll({
                raw: true,
                include: [ {model: Membership,
                            where: {
                                userId: user.id
                            },
                            attributes: []},

                        ],
                attributes: {
                    include: [
                        [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],

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

                groups[i].previewImage = images['GroupImages.url'];
            }
            res.json({Groups:groups});

});


/*
Get details of a Group from their ID ✅
    /api/groups/:groupId
*/
router.get('/:groupId', async (req, res) => {
    const { groupId } = req.params;

    let group = await Group.findByPk(groupId, {
        include: [

            {model: Membership,
                attributes: [] }],
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
                groupId
            }
        });
        const venues = await Venue.findAll({
            raw: true,
            where: {
                groupId
            }
        });
        const groupImages = await GroupImage.findAll({
            raw: true,
            where: {
                groupId: req.params.groupId
            }
        });
        // console.log(groupImages);
        // let previewImage = 'https://i.imgur.com/7EYSecN.png';
        // let imageForGroup = groupImages.filter(ele => ele.preview === 1);
        // console.log(imageForGroup);
        // if(imageForGroup.length) {
        //     previewImage = imageForGroup[0]?.url ?? 'https://i.imgur.com/7EYSecN.png';
        // }
        const images = await Group.findByPk(groupId, {
            raw: true,
            include: [{
                        model: GroupImage,
                        where: {preview: true},
                        attributes: ['url']
            }]
        });

        const organizerName = `${organizer.firstName} ${organizer.lastName}`;
        group.numMembers = count;
        group.GroupImages = groupImages;
        group.Organizer = organizer;
        group.Venues = venues;
        group.organizerName = organizerName;
        group.previewImage = images?.['GroupImages.url'] ?? 'https://i.imgur.com/7EYSecN.png';
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

                ],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Memberships.id")), "numMembers"],

            ]
        },
        group: ['Group.id']
    });


    for (let i = 0; i < groups.length; i++) {

        const images = await Group.findByPk(groups[i].id, {
            raw: true,
            include: [{
                        model: GroupImage,
                        where: {preview: true},
                        attributes: ['url']
            }]
        });
        groups[i].numMembers = Number(groups[i].numMembers);
        groups[i].previewImage = images ? images['GroupImages.url'] : 'https://i.imgur.com/7EYSecN.png';
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
router.delete('/:groupId/membership/:memberId', async(req, res) => {
    console.log('we are in the router.delete');
    const { user } = req;
    const { id } = req.user;
    const { groupId, memberId } = req.params;

    console.log('this is the id:', id);

    const group = await Group.findByPk(req.params.groupId, {raw: true});
    if (!group) {
        res.status(404);
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
        });
    }
    const { organizerId } = group;
    console.log('this is the organizerId:', organizerId);
    const findUser = await User.findByPk(memberId);
    if (!findUser) {
        res.status(400);
        res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "memberId": "User couldn't be found"
            }
          });
    }

    const membership = await Membership.findOne({raw: true,
        where: { [Op.and]: [ { userId: memberId }, { groupId } ]} });
    if (!membership) {
        res.status(404);
        res.json({
            "message": "Membership does not exist for this User",
            "statusCode": 404
          });
    }
    console.log('this is the membership:', membership);
    const { status } = membership;
    console.log('this is the status:', status);

    if ((Number(memberId) === Number(id) || Number(organizerId) === Number(id)) && status !== 'organizer') {

        const membershipToDelete = await Membership.findOne({
            where: {
                [Op.and]: [
                    { userId: memberId },
                    { groupId: groupId }
                ]
            }
        });
        membershipToDelete.destroy();

        res.json({
            "message": "Successfully deleted membership from group"
          });

    } else {
        console.log('this is where we are at');
        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
          });
    }

});

/*
Delete a group by their ID ✅
    /api/groups/:groupId
*/
router.delete('/:groupId', requireAuth, async(req, res) => {
    const { user } = req;
    const { groupId } = req.params;


        const group = await Group.findByPk(groupId, {raw:true});

        if (group) {

            if (group.organizerId === user.id) {

                const groupToDestroy = await Group.findByPk(groupId);

                await groupToDestroy.destroy();

                res.json({
                    "message": "Successfully deleted",
                    "statusCode": 200
                  });

            } else {

                res.status(403);
                res.json({
                    "message": "Forbidden",
                    "statusCode": 403
                  });

            }
        }
        else {

            res.status(404);
            res.json({
                "message": "Group couldn't be found",
                "statusCode": 404
              });

        }

});

// ********************* POST REQUESTS *************************

/*
Add an image to a Group by their ID
    /api/groups/:groupId/images
*/
router.post('/:groupId/images', requireAuth, async(req, res) => {
    const { groupId } = req.params;
    const { user } = req;
    let {url, preview} = req.body;

    const group = await Group.findByPk(groupId, {raw: true});

    if (group) {

        if (group.organizerId === user.id) {

            if (!preview) preview = false;

            const newImage = await GroupImage.create({
                groupId,
                url,
                preview
            });

            res.json({
                id: newImage.id,
                url: newImage.url,
                preview: newImage.preview
            });

        } else {

            res.status(403);
                res.json({
                    "message": "Forbidden",
                    "statusCode": 403
                  });

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
Create a Venue for a Group by their ID
    /api/groups/:groupId/venues
*/
router.post('/:groupId/venues', requireAuth, async(req, res) => {
    const { groupId } = req.params;
    const { user } = req;
    const { address, city, state, lat, lng } = req.body;
// **************** Need to add validation errors ********************
/*
            {
              "message": "Validation error",
              "statusCode": 400,
              "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
              }
            }
*/
// ******************************************************************
    const group = await Group.findByPk(groupId, {raw: true});

    if (group) {

        const memStatus = await Membership.findOne({ raw: true,
            where: { userId: user.id, groupId: groupId}, attributes: ['status'] });

        if (memStatus.status === 'organizer' || memStatus.status === 'co-host') {

            const newVenue = await Venue.create({
                groupId,
                address,
                city,
                state,
                lat,
                lng
            });

            res.json({
                id: newVenue.id,
                groupId: newVenue.groupId,
                address: newVenue.address,
                city: newVenue.city,
                state: newVenue.state,
                lat: +newVenue.lat,
                lng: +newVenue.lng
            });

        } else {

            res.status(403);
                res.json({
                    "message": "Forbidden",
                    "statusCode": 403
                  });

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
Create an Event for a Group by their ID
    /api/groups/:groupId/events
*/
router.post('/:groupId/events', requireAuth, async(req, res) => {
    const { groupId } = req.params;
    const { user } = req;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
// **************** Need to add validation errors ********************
/*
            {
              "message": "Validation error",
              "statusCode": 400,
              "errors": {
                "venueId": "Venue does not exist",
                "name": "Name must be at least 5 characters",
                "type": "Type must be Online or In person",
                "capacity": "Capacity must be an integer",
                "price": "Price is invalid",
                "description": "Description is required",
                "startDate": "Start date must be in the future",
                "endDate": "End date is less than start date",
              }
            }
*/
// ******************************************************************
    const group = await Group.findByPk(groupId, {raw: true});

    if (group) {

        const memStatus = await Membership.findOne({raw: true,
            where: { userId: user.id, groupId: groupId }, attributes: ['status'] });

        if (memStatus.status === 'organizer' || memStatus.status === 'co-host') {
            const count = await Event.max('id');
            const newEvent = await Event.create({
                id: count + 1,
                groupId: +groupId,
                venueId,
                name,
                type,
                capacity,
                price,
                description,
                startDate,
                endDate
            });
            const attend = await Attendance.max('id');
            const newAttendee = await Attendance.create({
                id: attend + 1,
                userId: user.id,
                eventId: newEvent.id,
                status: 'member'
            });

            res.json({
                id: newEvent.id,
                groupId: newEvent.groupId,
                venueId: newEvent.venueId,
                name: newEvent.name,
                type: newEvent.type,
                capacity: newEvent.capacity,
                price: +newEvent.price,
                description: newEvent.description,
                startDate: newEvent.startDate,
                endDate: newEvent.endDate
            });

        } else {

            res.status(403);
                res.json({
                    "message": "Forbidden",
                    "statusCode": 403
                  });

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
Request Membership for a Group by their ID
    /api/groups/:groupId/membership
*/
router.post('/:groupId/membership', requireAuth, async(req, res) => {
    // const { groupId } = req.params;
    // const { user } = req;
    // const memberId = user.id;
    const { groupId, memberId } = req.body;
    const group = await Group.findByPk(groupId, {raw: true});

    if (group) {

        const memStatus = await Membership.findOne({raw: true,
            where: { userId: memberId, groupId: groupId }, attributes: ['status'] });
        console.log('this is the memStatus:', memStatus);
        if(memStatus) {

            res.status(400);

            if (memStatus.status === 'pending') {

                res.json({
                    "message": "Membership has already been requested",
                    "statusCode": 400
                  });

            } else {

                res.json({
                    "message": "User is already a member of the group",
                    "statusCode": 400
                  });

            }
        } else {
            const count = await Membership.max('id');
            const newMember = await Membership.create({
                id: count + 1,
                userId: memberId,
                groupId,
                status: 'pending'
            });
            // const memberInfo = newMember.toJSON();

            res.json({
                groupId: newMember.groupId,
                memberId: newMember.userId,
                status: newMember.status,
            });
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
Create a Group
    /api/groups
*/
router.post('/', requireAuth, async(req, res) => {

    const { user } = req;
    const { name, about, type, private, city, state } = req.body;
    const organizerId = user.id;
// **************** Need to add validation errors ********************
/*
            {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "name": "Name must be 60 characters or less",
                "about": "About must be 50 characters or more",
                "type": "Type must be 'Online' or 'In person'",
                "private": "Private must be a boolean",
                "city": "City is required",
                "state": "State is required",
              }
            }
*/
// ******************************************************************

    if (user) {

        const newGroup = await Group.create({
            organizerId,
            name,
            about,
            type,
            private,
            city,
            state
        });

        const groupId = newGroup.toJSON().id;
        const count = await Membership.max('id');
        const newMember = await Membership.create({
            id: count + 1,
            userId: organizerId,
            groupId,
            status: 'organizer'
        });

        res.json(newGroup);

    } else {

        res.status(401);
        res.json({
            "message": "Authentication required",
            "statusCode": 401
          });

    }
});

// ********************* PUT REQUESTS *************************

/*
Change the status of a Membership for a Group by their ID
    /api/groups/:groupId/membership
*/
router.put('/:groupId/membership', requireAuth, async(req, res) => {
    const { groupId } = req.params;
    const { user } = req;
    const { memberId, status } = req.body;


        const findUser = await User.findByPk(memberId);
        if (!findUser) {

            res.status(400);
            res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "memberId": "User couldn't be found"
                }
              });
        }

        const group = await Group.findByPk(groupId, {raw: true});

        if (group) {

            if (status === 'pending') {

                res.status(400);
                res.json({
                    "message": "Validations Error",
                    "statusCode": 400,
                    "errors": {
                      "status" : "Cannot change a membership status to pending"
                    }
                  });

            }


            const memStatus = await Membership.findOne({raw: true,
                where: { userId: user.id, groupId: groupId }, attributes: ['status'] });

            const memIsReal = await Membership.findOne({raw: true,
                where: { userId: memberId, groupId: groupId }, attributes: ['status'] });

            console.log(memIsReal)
            if (memIsReal) {

                if ((status === 'member' && (memStatus.status === 'organizer' || memStatus.status === 'co-host'))
                        || (status === 'co-host' && memStatus.status === 'organizer')) {

                    let memToChange = await Membership.findOne({where: { userId: memberId, groupId: groupId }});
                    memToChange.status = status;
                    await memToChange.save();

                    res.json({
                        id: memToChange.id,
                        groupId: memToChange.groupId,
                        memberId: memToChange.userId,
                        status: memToChange.status
                    });

                } else {

                    res.status(403);
                    res.json({
                        "message": "Forbidden",
                        "statusCode": 403
                      });

                }
            } else {

                res.status(404);
                res.json({
                    "message": "Membership between the user and the group does not exist",
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

});

/*
Edit a Group by their ID
    /api/groups/:groupId/membership
*/
router.put('/:groupId', requireAuth, async(req, res) => {
    const { groupId } = req.params;
    const { user } = req;
    const { name, about, type, private, city, state } = req.body;
// **************** Need to add validation errors ********************
/*
            {
              "message": "Validation Error",
              "statusCode": 400,
              "errors": {
                "name": "Name must be 60 characters or less",
                "about": "About must be 50 characters or more",
                "type": "Type must be 'Online' or 'In person'",
                "private": "Private must be a boolean",
                "city": "City is required",
                "state": "State is required",
              }
            }
*/
// ******************************************************************
    const group = await Group.findByPk(groupId, {raw: true});

    if (group) {

        const memStatus = await Membership.findOne({ raw: true,
            where: { userId: user.id, groupId: groupId}, attributes: ['status'] });

        if (memStatus.status === 'organizer') {

            const editGroup = await Group.findByPk(groupId);

            editGroup.set({
                name,
                about,
                type,
                private,
                city,
                state
            });

            await editGroup.save();

            res.json(editGroup);

        } else {

            res.status(403);
                res.json({
                    "message": "Forbidden",
                    "statusCode": 403
                  });

        }

    } else {

        res.status(404);
        res.json({
            "message": "Group couldn't be found",
            "statusCode": 404
          });

    }
});

module.exports = router;
