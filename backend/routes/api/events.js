// backend/routes/api/events.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Attendance, Venue, Event, Membership, EventImage, sequelize } = require('../../db/models');
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
    if (event) {
        let result = await User.findAll({
            raw: true,
            include: [{model: Attendance,
                        where: {
                            eventId
                        },
                        attributes: []
                         }]
        });
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
                    eventId
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
        if (user.id === event.organizerId || cohost.includes(user.id)) {
            res.json({
                Attendees: original
            })
        } else {
            res.json({
                Attendees: limited
            })
        }
    } else {
        res.status(404);
        res.json({
            "message": "event couldn't be found",
            "statusCode": 404
          });
    }

});

/*
Get details of an Event by their ID
    /api/events/:eventId
*/
router.get('/:eventId', async (req, res) => {

});

/*
Get all Events
    /api/events
*/
router.get('/', async (req, res) => {

});

// ********************* DELETE REQUESTS *************************

/*
Delete Attendance to an Event by their ID
    /api/events/:eventId/attendance
*/
router.delete('/:eventId/attendance', async (req, res) => {

});

/*
Delete an Event by their ID
    /api/events/:eventId
*/
router.delete('/:eventId', async (req, res) => {

});

// ********************* POST REQUESTS *************************

/*
Add an Image to an Event by their ID
    /api/events/:eventId/images
*/
router.post('/:eventId/images', async (req, res) => {

});

/*
Request to Attend an Event by their ID
    /api/events/:eventId/attendance
*/
router.post('/:eventId/attendance', async (req, res) => {

});

// ********************* PUT REQUESTS *************************

/*
Change the status of an Attendance for an Event by their ID
    /api/events/:eventId/attendance
*/
router.put('/:eventId/attendance', async (req, res) => {

});

/*
Edit an Event by their ID
    /api/events/:eventId
*/
router.put('/:eventId', async (req, res) => {

});


module.exports = router;
