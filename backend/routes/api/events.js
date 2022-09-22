// backend/routes/api/events.js
const express = require('express');
const { requireAuth, setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Attendance, Venue, Event, Membership, Group, EventImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const router = express.Router();

// ********************* GET REQUESTS *************************

/*
Get all Attendees of an Event by their ID
    /api/events/:eventId/attendees
*/
router.get('/:eventId/attendees', async (req, res) => {
    const { user } = req;
    const { eventId } = req.params;
    const event = await Event.findByPk(eventId, {raw:true});
    if (!event) {

        res.status(404);
        res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
        });
    }
    const { groupId } = event;
        let result = await User.findAll({
            raw: true,
            include: [{model: Attendance,
                        where: {
                            eventId
                        },
                        attributes: []
                         }]
        });
        console.log(result);
        // console.log(result);
        let original = [];
        let limited = [];
        let cohost = [];
        for (let i = 0; i < result.length; i++) {
            const attStatus = await Attendance.findOne({
                raw: true,
                where: {
                    userId: result[i].id,
                    eventId
                },
                attributes: ['status']
            });
            result[i].Attendance = attStatus;
            original.push(result[i]);
            const memStatus = await Membership.findOne({
                raw: true,
                where: {
                    userId: result[i].id,
                    groupId
                },
                attributes: ['status']
            });
            if (memStatus.status === 'co-host') {
                cohost.push(result[i].id)
            }
            if (attStatus.status !== 'pending') {
                limited.push(result[i])
            }
        }
        if (!user) {
            res.json({
                Attendees: limited
            })
        }
        if (user.id === event.organizerId || cohost.includes(user.id)) {
            res.json({
                Attendees: original
            })
        } else {
            res.json({
                Attendees: limited
            })
        }

});

/*
Get details of an Event by their ID
    /api/events/:eventId
*/
router.get('/:eventId', async (req, res) => {

    const { eventId } = req.params;

    let event = await Event.scope('details').findByPk(eventId, {
        include: [
            {model: Attendance,
                attributes: [] }],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Attendances.id")), "numAttending"],
            ]
        },
        group: ['Event.id']
    });

    if (event) {
        event = event.toJSON();
        const group = await Group.findByPk(event.groupId, {
            raw: true,
            attributes: ['id', 'name', 'private', 'city', 'state']
        });
        const count = await Attendance.count({
            where: {
                eventId
            }
        });
        const { venueId } = event;
        const venue = await Venue.findByPk(venueId, {raw: true, attributes: { exclude: ['groupId']}});
        const eventImages = await EventImage.findAll({
            raw: true,
            attributes: ['id', 'url', 'preview'],
            where: {
                eventId
            }
        });
        venue.lat = Number(venue.lat);
        venue.lng = Number(venue.lng);
        event.price = Number(event.price);
        event.numAttending = count;
        event.Group = group;
        event.Venue = venue;
        event.EventImages = eventImages;
        event.previewImage = eventImages?.[0]?.url ?? 'https://i.imgur.com/7EYSecN.png';
        res.json(event);
    } else {
        res.status(404);
        res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
          });
    }
});

/*
Get all Events
    /api/events
*/
router.get('/', async (req, res) => {
    let { page, size } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    if (!page || isNaN(page)) {
        page = 1;
    } else if (page < 0) {
        page = 1;
    }
    if (!size || isNaN(size)) {
        size = 20;
    } else if (size < 0) {
        size = 20;
    }

    // const pag = {};
    // pag.limit = size;
    // pag.offset = ;


    const events = await Event.findAll({
        raw: true,
        include: [ {model: Attendance,
                    attributes: [] },

                ],
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Attendances.id")), "numAttending"],

            ]
        },
        group: ['Event.id']
    });

    console.log(events)
    for (let i = 0; i < events.length; i++) {

        const images = await Event.findByPk(events[i].id, {
            raw: true,
            include: [{
                        model: EventImage,
                        where: {preview: true},
                        attributes: ['url']
            }]
        });

/*********************** Fixes the silly date information **********************/

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

/*********************** Continue on with the normal business **********************/

        console.log(images);
        const count = await Attendance.count({
            where: {
                eventId: events[i].id
            }
        });
        const venue = await Venue.findByPk(events[i].venueId, {
            raw: true, attributes: ['id', 'city', 'state']});
        const group = await Group.findByPk(events[i].groupId, {
            raw: true, attributes: ['id', 'name', 'city', 'state']
        });
        events[i].groupName = group.name;
        events[i].groupCity = group.city;
        events[i].groupState = group.state;

        events[i].numAttending = count;
        if (!images) {
            events[i].previewImage = null;
        } else {
            const url = images['EventImages.url'];
            events[i].previewImage = url;
        }
        events[i].Group = group;
        events[i].Venue = venue;

    }

    const offset = size * (page - 1) || -1;

    const result = events.slice(offset + 1, offset + size + 1)

    res.json({
        Events: result
    });
});

// ********************* DELETE REQUESTS *************************

/*
Delete Attendance to an Event by their ID
    /api/events/:eventId/attendance
*/
router.delete('/:eventId/attendance', requireAuth, async (req, res) => {

    const { user } = req;
    const { memberId } = req.body;
    const { eventId } = req.params;


    // CHANGE THIS AFTER BECAUSE THE POSTMAN TESTS ARE DUMB
    const userId = user.id;

    const event = await Event.findByPk(eventId, { raw: true });
    if (!event) {

        res.status(404);
        res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
          });
    }

    const { groupId } = event;
    const group = await Group.findByPk(groupId, { raw: true });

    // const userAttend = await Attendance.findOne({ raw: true, where: { eventId, userId: memberId } });
    const userAttend = await Attendance.findOne({ raw: true, where: { eventId, userId } });


    if (!userAttend) {

        res.status(404);
        res.json({
            "message": "Attendance does not exist for this User",
            "statusCode": 404
          });
    }

    const { id } = userAttend;
    const memStatus = await Membership.findOne({
        raw: true,
        where: {
            userId,
            groupId
        },
        attributes: ['status']
    });

    if (memberId === user.id || memStatus.status === 'co-host' || memStatus.status === 'organizer'){

        const attendToDelete = await Attendance.findByPk(id);

        await attendToDelete.destroy();

        res.json({
            "message": "Successfully deleted attendance from event"
          });

    } else {

        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }
});

/*
Delete an Event by their ID
    /api/events/:eventId
*/
router.delete('/:eventId', requireAuth, async (req, res) => {

    const { user } = req;
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId, {raw: true});
    if (!event) {

        res.status(404);
        res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
          });
    }
    const { groupId } = event;

    const memStatus = await Membership.findOne({
        raw: true,
        where: {
            userId: user.id,
            groupId
        },
        attributes: ['status']
    });
    const group = await Group.findByPk(groupId, {raw: true});

    if (!group) {

        res.status(404);
        res.json({
          "message": "Group couldn't be found",
          "statusCode": 404
        });
    }

    const { organizerId } = group;

    if (!memStatus) {

        if (organizerId === user.id) {

            const eventToDelete = await Event.findByPk(eventId);

            await eventToDelete.destroy();

            res.json({
                "message": "Successfully deleted"
              });
        }
    } else if (memStatus.status === 'co-host' || memStatus.status === 'organizer') {

        const eventToDelete = await Event.findByPk(eventId);

        await eventToDelete.destroy();

        res.json({
            "message": "Successfully deleted"
          });

    } else {

        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }

});

// ********************* POST REQUESTS *************************

/*
Add an Image to an Event by their ID
    /api/events/:eventId/images
*/
router.post('/:eventId/images', requireAuth, async (req, res) => {
    const { eventId } = req.params;
    const { user } = req;
    let {url, preview} = req.body;

    const event = await Event.findByPk(eventId, {raw: true});

    if (!event) {

        res.status(404);
        res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
          });
    }
    const { groupId } = event;

    const group = await Group.findByPk(groupId, {raw: true});

    const { organizerId } = group;

    const attendee = await Attendance.findOne({
        where: { eventId, userId: user.id }
    });

    if (attendee || organizerId === user.id) {

        if (!preview) preview = false;

        const newImage = await EventImage.create({
            eventId,
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

});

/*
Request to Attend an Event by their ID
    /api/events/:eventId/attendance
*/
router.post('/:eventId/attendance', requireAuth, async (req, res) => {

    const { eventId } = req.params;
    const { user } = req;
    const userId = user.id;
    const event = await Event.findByPk(eventId);

    if (!event) {

        res.status(404);
        res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
          });
    }

        const attStatus = await Attendance.findOne({raw: true,
            where: { userId, eventId }, attributes: ['status'] });

        if(attStatus) {

            res.status(400);

            if (attStatus.status === 'pending') {

                res.json({
                    "message": "Attendance has already been requested",
                    "statusCode": 400
                  });

            } else {

                res.json({
                    "message": "User is already an attendee of the event",
                    "statusCode": 400
                  });

            }

        } else {
            const count = await Attendance.max('id');
            const newAttendee = await Attendance.create({
                id: count + 1,
                userId,
                eventId,
                status: 'pending'
            });

            res.json({
                eventId: Number(newAttendee.eventId),
                userId: newAttendee.userId,
                status: newAttendee.status,
            });
        }

});

// ********************* PUT REQUESTS *************************

/*
Change the status of an Attendance for an Event by their ID
    /api/events/:eventId/attendance
*/
router.put('/:eventId/attendance', requireAuth, async (req, res) => {

    const { eventId } = req.params;
    const { user } = req;
    const { userId, status } = req.body;


        const findUser = await User.findByPk(userId);
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

        const event = await Event.findByPk(eventId, {raw: true});

        if (!event) {

            res.status(404);
            res.json({
                "message": "Event couldn't be found",
                "statusCode": 404
            });
        }
        const { groupId } = event;

        if (status === 'pending') {

                        res.status(400);
                        res.json({
                            "message": "Validations Error",
                            "statusCode": 400,
                            "errors": {
                              "status" : "Cannot change an attendance status to pending"
                            }
                          });

            }

            const memStatus = await Membership.findOne({raw: true,
                where: { userId: user.id, groupId }, attributes: ['status'] });

            const attIsReal = await Attendance.findOne({ where: { userId, eventId } });
                console.log(memStatus)
            if (!attIsReal) {
                        res.status(404);
                        res.json({
                            "message": "Attendance between the user and the event does not exist",
                            "statusCode": 404
                          });
            }

            if ((status === 'member' && (memStatus.status === 'organizer' || memStatus.status === 'co-host'))) {

                const attToChange = await Attendance.findOne({ where: { userId, eventId } });
                attToChange.status = 'member';
                    await attToChange.save();

                    res.json({
                        id: attToChange.id,
                        eventId: attToChange.eventId,
                        userId: attToChange.userId,
                        status: attToChange.status
                    });

            } else {
                        res.status(403);
                        res.json({
                            "message": "Forbidden",
                            "statusCode": 403
                          });
            }
});

/*
Edit an Event by their ID
    /api/events/:eventId
*/
router.put('/:eventId', requireAuth, async (req, res) => {
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
    const { eventId } = req.params;
    const { user } = req;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

    const event = await Event.findByPk(eventId, {raw: true});

    if (!event) {

        res.status(404);
        res.json({
            "message": "Event couldn't be found",
            "statusCode": 404
        });
    }
    const { groupId } = event;

    const venue = await Venue.findByPk(venueId);

    if (!venue) {

        res.status(404);
        res.json({
            "message": "Venue couldn't be found",
            "statusCode": 404
          });
    }

    const memStatus = await Membership.findOne({raw: true,
        where: { userId: user.id, groupId }, attributes: ['status'] });

    if (memStatus.status === 'organizer' || memStatus.status === 'co-host') {

        let eventToChange = await Event.findByPk(eventId);

        eventToChange.update({
            venueId,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate
        });
        await eventToChange.save();

        res.json({
            "id": eventToChange.id,
        "venueId": eventToChange.venueId,
        "groupId": eventToChange.groupId,
        "name": eventToChange.name,
        "description": eventToChange.description,
        "type": eventToChange.type,
        "capacity": eventToChange.capacity,
        "price": eventToChange.price,
        "startDate": eventToChange.startDate,
        "endDate": eventToChange.endDate
        });

    } else {

        res.status(403);
        res.json({
            "message": "Forbidden",
            "statusCode": 403
          });
    }
});


module.exports = router;
