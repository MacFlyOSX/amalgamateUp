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
    // const { user } = req;
    // const { eventId } = req.params;
    // const event = await Event.findByPk(eventId, {raw:true});
    // if (event) {
    //     let result = await User.findAll({
    //         raw: true,
    //         include: [{model: Attendance,
    //                     where: {
    //                         eventId
    //                     },
    //                     attributes: []
    //                      }]
    //     });
    //     // console.log(result);
    //     let original = [];
    //     let limited = [];
    //     let cohost = [];
    //     for (let i = 0; i < result.length; i++) {
    //         const attStatus = await Attendance.findOne({
    //             raw: true,
    //             where: {
    //                 userId: result[i].id,
    //                 eventId
    //             },
    //             attributes: ['status']
    //         });
    //         result[i].Attendance = attStatus;
    //         original.push(result[i]);
    //         const memStatus = await Membership.findOne({
    //             raw: true,
    //             where: {
    //                 userId: result[i].id,
    //                 eventId
    //             },
    //             attributes: ['status']
    //         });
    //         if (memStatus.status === 'co-host') {
    //             cohost.push(result[i].id)
    //         }
    //         if (attStatus.status !== 'pending') {
    //             limited.push(result[i])
    //         }
    //     }
    //     if (user.id === event.organizerId || cohost.includes(user.id)) {
    //         res.json({
    //             Attendees: original
    //         })
    //     } else {
    //         res.json({
    //             Attendees: limited
    //         })
    //     }
    // } else {
    //     res.status(404);
    //     res.json({
    //         "message": "event couldn't be found",
    //         "statusCode": 404
    //       });
    // }

});

/*
Get details of an Event by their ID
    /api/events/:eventId
*/
router.get('/:eventId', async (req, res) => {

    // const { eventId } = req.params;

    // let event = await Event.findByPk(eventId, {
    //     include: [
    //         {model: Attendance,
    //             attributes: [] }],
    //     attributes: {
    //         include: [
    //             [sequelize.fn("COUNT", sequelize.col("Attendances.id")), "numAttending"],
    //         ]
    //     },
    //     group: ['Event.id']
    // });

    // if (event) {
    //     event = event.toJSON();
    //     const group = await Group.findByPk(event.groupId, {
    //         raw: true,
    //         attributes: ['id', 'name', 'private', 'city', 'state']
    //     });
    //     const count = await Attendance.count({
    //         where: {
    //             eventId
    //         }
    //     });
    //     const venue = await Venue.findByPk(venueId, {raw: true});
    //     const eventImages = await EventImage.findAll({
    //         raw: true,
    //         where: {
    //             eventId
    //         }
    //     })
    //     event.numAttending = count;
    //     event.Group = group;
    //     event.Venue = venue;
    //     event.EventImages = eventImages;
    //     res.json(event);
    // } else {
    //     res.status(404);
    //     res.json({
    //         "message": "Event couldn't be found",
    //         "statusCode": 404
    //       });
    // }
});

/*
Get all Events
    /api/events
*/
router.get('/', async (req, res) => {

    // const events = await Event.findAll({
    //     raw: true,
    //     include: [ {model: Attendance,
    //                 attributes: [] },

    //             ],
    //     attributes: {
    //         include: [
    //             [sequelize.fn("COUNT", sequelize.col("Attendances.id")), "numAttending"],

    //         ]
    //     },
    //     group: ['Event.id']
    // });


    // for (let i = 0; i < events.length; i++) {

    //     const images = await Event.findByPk(events[i].id, {
    //         raw: true,
    //         include: [{
    //                     model: EventImage,
    //                     where: {preview: true},
    //                     attributes: ['url']
    //         }]
    //     });
    //     const count = await Attendance.count({
    //         where: {
    //             eventId: events[i].id
    //         }
    //     });
    //     const venue = await Venue.findByPk(events[i].venueId, {
    //         raw: true, attributes: ['id', 'city', 'state']});
    //     const group = await Group.findByPk(events[i].groupId, {
    //         raw: true, attributes: ['id', 'name', 'city', 'state']
    //     });

    //     events[i].numAttending = count;
    //     events[i].previewImage = images['EventImages.url'];
    //     events[i].Group = group;
    //     events[i].Venue = venue;

    // }

    // res.json({
    //     Events: events
    // });
});

// ********************* DELETE REQUESTS *************************

/*
Delete Attendance to an Event by their ID
    /api/events/:eventId/attendance
*/
router.delete('/:eventId/attendance', requireAuth, async (req, res) => {

    // const { user } = req;
    // const { userId } = req.body;
    // const { eventId } = req.params;

    // const event = await Event.findByPk(eventId, { raw: true });
    // if (!event) {

    //     res.status(404);
    //     res.json({
    //         "message": "Event couldn't be found",
    //         "statusCode": 404
    //       });
    // }

    // const { groupId } = event;
    // const group = await Group.findByPk(groupId, { raw: true });

    // const userAttend = await Attendance.findOne({ raw: true, where: { eventId, userId } });

    // if (!userAttend) {

    //     res.status(404);
    //     res.json({
    //         "message": "Attendance does not exist for this User",
    //         "statusCode": 404
    //       });
    // }

    // const { id } = userAttend;
    // const memStatus = await Membership.findOne({
    //     raw: true,
    //     where: {
    //         userId: user.id,
    //         eventId
    //     },
    //     attributes: ['status']
    // });

    // const { status } = memStatus;

    // if (userId === user.id || status === 'co-host' || status === 'organizer'){

    //     const attendToDelete = await Attendance.findByPk(id);

    //     await attendToDelete.destroy();

    //     res.json({
    //         "message": "Successfully deleted attendance from event"
    //       });

    // } else {

    //     res.status(403);
    //     res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // }
});

/*
Delete an Event by their ID
    /api/events/:eventId
*/
router.delete('/:eventId', requireAuth, async (req, res) => {

    // const { user } = req;
    // const { eventId } = req.params;

    // const event = await Event.findByPk(eventId);
    // if (!event) {

    //     res.status(404);
    //     res.json({
    //         "message": "Event couldn't be found",
    //         "statusCode": 404
    //       });
    // }

    // const memStatus = await Membership.findOne({
    //     raw: true,
    //     where: {
    //         userId: user.id,
    //         eventId
    //     },
    //     attributes: ['status']
    // });

    // const { status } = memStatus;

    // if (status === 'co-host' || status === 'organizer') {

    //     const eventToDelete = await Event.findByPk(eventId);

    //     await eventToDelete.destroy();

    //     res.json({
    //         "message": "Successfully deleted"
    //       });

    // } else {

    //     res.status(403);
    //     res.json({
    //         "message": "Forbidden",
    //         "statusCode": 403
    //     });
    // }

});

// ********************* POST REQUESTS *************************

/*
Add an Image to an Event by their ID
    /api/events/:eventId/images
*/
router.post('/:eventId/images', requireAuth, async (req, res) => {
    // const { eventId } = req.params;
    // const { user } = req;
    // const {url, preview} = req.body;

    // const event = await Group.findByPk(eventId, {raw: true});

    // if (event) {

    //     const attendee = await Attendance.findOne({
    //         where: { eventId, userId: user.id }
    //     });
    //     if (attendee) {

    //         if (!preview) preview = false;

    //         const newImage = await EventImage.create({
    //             eventId,
    //             url,
    //             preview
    //         });

    //         res.json({
    //             id: newImage.id,
    //             url: newImage.url,
    //             preview: newImage.preview
    //         });

    //     } else {

    //         res.status(403);
    //             res.json({
    //                 "message": "Forbidden",
    //                 "statusCode": 403
    //               });

    //     }
    // } else {

    //     res.status(404);
    //     res.json({
    //         "message": "Event couldn't be found",
    //         "statusCode": 404
    //       });

    // }
});

/*
Request to Attend an Event by their ID
    /api/events/:eventId/attendance
*/
router.post('/:eventId/attendance', requireAuth, async (req, res) => {

    // const { eventId } = req.params;
    // const { user } = req;
    // const userId = user.id;
    // const event = await Event.findByPk(eventId);

    // if (!event) {

    //     res.status(404);
    //     res.json({
    //         "message": "Event couldn't be found",
    //         "statusCode": 404
    //       });
    // }

    //     const attStatus = await Attendance.findOne({raw: true,
    //         where: { userId, eventId }, attributes: ['status'] });

    //     if(attStatus) {

    //         res.status(400);

    //         if (attStatus.status === 'pending') {

    //             res.json({
    //                 "message": "Attendance has already been requested",
    //                 "statusCode": 400
    //               });

    //         } else {

    //             res.json({
    //                 "message": "User is already an attendee of the event",
    //                 "statusCode": 400
    //               });

    //         }

    //     } else {
    //         const count = await Attendance.max('id');
    //         const newAttendee = await Attendance.create({
    //             id: count + 1,
    //             userId,
    //             eventId,
    //             status: 'pending'
    //         });

    //         res.json({
    //             groupId: newAttendee.groupId,
    //             memberId: newAttendee.userId,
    //             status: newAttendee.status,
    //         });
    //     }

});

// ********************* PUT REQUESTS *************************

/*
Change the status of an Attendance for an Event by their ID
    /api/events/:eventId/attendance
*/
router.put('/:eventId/attendance', requireAuth, async (req, res) => {

    // const { eventId } = req.params;
    // const { user } = req;
    // const { userId, status } = req.body;


    //     const findUser = await User.findByPk(userId);
    //     if (!findUser) {

    //         res.status(400);
    //         res.json({
    //             "message": "Validation Error",
    //             "statusCode": 400,
    //             "errors": {
    //               "memberId": "User couldn't be found"
    //             }
    //           });
    //     }

    //     const event = await Event.findByPk(eventId, {raw: true});
    //     const { groupId } = event.groupId;

    //     if (!event) {

    //                     res.status(404);
    //                     res.json({
    //                         "message": "Event couldn't be found",
    //                         "statusCode": 404
    //                       });
    //     }

    //     if (status === 'pending') {

    //                     res.status(400);
    //                     res.json({
    //                         "message": "Validations Error",
    //                         "statusCode": 400,
    //                         "errors": {
    //                           "status" : "Cannot change an attendance status to pending"
    //                         }
    //                       });

    //         }

    //         const memStatus = await Membership.findOne({raw: true,
    //             where: { userId: user.id, groupId }, attributes: ['status'] });

    //         const attIsReal = await Attendance.findOne({ raw: true, where: { userId, eventId } });
    //         const { id } = attIsReal.id;

    //         if (!attIsReal) {
    //                     res.status(404);
    //                     res.json({
    //                         "message": "Membership between the user and the group does not exits",
    //                         "statusCode": 404
    //                       });
    //         }

    //         if ((status === 'member' && (memStatus.status === 'organizer' || memStatus.status === 'co-host'))) {

    //                 let attToChange = await Attendance.findByPk(id);
    //                 attToChange.status = status;
    //                 await attToChange.save();

    //                 res.json({
    //                     id: attToChange.id,
    //                     eventId: attToChange.groupId,
    //                     userId: attToChange.userId,
    //                     status: attToChange.status
    //                 });

    //         } else {
    //                     res.status(403);
    //                     res.json({
    //                         "message": "Forbidden",
    //                         "statusCode": 403
    //                       });
    //         }
});

/*
Edit an Event by their ID
    /api/events/:eventId
*/
router.put('/:eventId', requireAuth, async (req, res) => {

});


module.exports = router;
