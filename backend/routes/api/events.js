// backend/routes/api/events.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group, User, Membership, Venue, sequelize } = require('../../db/models');
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
