// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('firstName')
      .isLength({min: 2})
      .withMessage('First name must be at least 2 letters'),
    check('lastName')
      .isLength({min: 2})
      .withMessage('Last name must be at least 2 letters'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const doTheyExist = await User.findOne({where: { email }});
      if (doTheyExist) {
        res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": [
            "User with that email already exists"
          ]
        })
      }
      const user = await User.signup({ firstName, lastName, email, username, password });

      const token = await setTokenCookie(res, user);

      return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
      });
    }
  );


module.exports = router;
