// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const eventsRouter = require('./events.js');
const venuesRouter = require('./venues.js');
const { restoreUser, requireAuth } = require("../../utils/auth.js");
const { GroupImage, Membership, EventImage, Event, Group, sequelize } = require('../../db/models');


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/groups', groupsRouter);
router.use('/events', eventsRouter);
router.use('/venues', venuesRouter);

// ********************* DELETE IMAGE REQUESTS *************************

/*
Delete an Image for a Group
    /api/group-images/:imageId
*/
router.delete('/group-images/:imageId', requireAuth, async (req, res) => {
  const { user } = req;
  const { imageId } = req.params;

  const groupImage = await GroupImage.findByPk(imageId, {raw: true, attributes: ['groupId']});
  // console.log(groupImage)
  if (!groupImage) {

    res.status(404);
    res.json({
      "message": "Group Image couldn't be found",
      "statusCode": 404
    });
  }

  const {groupId} = groupImage;

  const memStatus = await Membership.findOne({
    raw: true, where: { userId: user.id, groupId}
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
      const groupImage = await GroupImage.findByPk(imageId);
      await groupImage.destroy();

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
  } else if (memStatus.status === 'organizer' || memStatus.status === 'co-host') {

    const groupImage = await GroupImage.findByPk(imageId);
    await groupImage.destroy();

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

});

/*
Delete an Image for an Event
    /api/event-images/:imageId
*/
router.delete('/event-images/:imageId', async (req, res) => {

  const { user } = req;
  const { imageId } = req.params;

  const eventImage = await EventImage.findByPk(imageId, {raw: true, attributes: ['eventId']});

  if (!eventImage) {

    res.status(404);
    res.json({
      "message": "Event Image couldn't be found",
      "statusCode": 404
    });
  }

  const {eventId} = eventImage;

  const event = await Event.findByPk(eventId, {raw: true});

  const { groupId } = event;

  const memStatus = await Membership.findOne({
    raw: true, where: { userId: user.id, groupId}
  });

  if(!memStatus) {
    const group = await Group.findByPk(groupId, {raw: true});

    if (!group) {

      res.status(404);
      res.json({
        "message": "Group couldn't be found",
        "statusCode": 404
      });
    }
    const { organizerId } = group;

    if (organizerId === user.id) {
      const eventImage = await EventImage.findByPk(imageId);
      await eventImage.destroy();

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
  } else if (memStatus.status === 'organizer' || memStatus.status === 'co-host') {
    const eventImage = await EventImage.findByPk(imageId);
    await eventImage.destroy();

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
});

// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

module.exports = router;
