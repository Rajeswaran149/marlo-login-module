const express = require('express');
const { isAuthenticatedUser } = require('./auth');
const {
  registerUser,
  loginUser,
  userProfile,
  logout,
  getUserData,
  deleteAccount,
} = require('./userController');
const router = express.Router();
router.route('/delete').delete(isAuthenticatedUser, deleteAccount);

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/me/update').put(isAuthenticatedUser, userProfile);
router.route('/me').get(isAuthenticatedUser, getUserData);
router.route('/logout').get(logout);

module.exports = router;
