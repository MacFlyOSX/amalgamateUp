// backend/routes/api/venues.js
const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Group, User, Membership, Venue, Event, Attendance, GroupImage, EventImage, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const router = express.Router();

/*
Edit a Venue by their ID
    /api/venues/:venueId
*/
router.put('/:venueId', requireAuth, async (req, res) => {
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
    const { venueId } = req.params;
    const { user } = req;
    const { address, city, state, lat, lng } = req.body;

    const venue = await Venue.findByPk(venueId, {raw: true});

    if (!venue) {

        res.status(404);
        res.json({
            "message": "Venue couldn't be found",
            "statusCode": 404
        });
    }
    const { groupId } = venue;

    const memStatus = await Membership.findOne({raw: true,
        where: { userId: user.id, groupId }, attributes: ['status'] });

    if (memStatus.status === 'organizer' || memStatus.status === 'co-host') {

        let venueToChange = await Venue.findByPk(venueId);

        venueToChange.update({
            address,
            city,
            state,
            lat,
            lng
        })
        await venueToChange.save();

        res.json({
            id: venueToChange.id,
            groupId: venueToChange.groupId,
            address: venueToChange.address,
            city: venueToChange.city,
            state: venueToChange.state,
            lat: venueToChange.lat,
            lng: venueToChange.lng,
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
