// backend/routes/api/venues.js
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group, User, Membership, Venue, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const router = express.Router();

/*
Edit a Venue by their ID
    /api/venues/:venueId
*/
router.put('/:venueId', async (req, res) => {

});


module.exports = router;
