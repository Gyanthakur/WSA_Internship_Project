const express = require('express');
const {
  getUser,
  registerUser,
  loginUser,
  loginWithToken,
  changePassword,
  sendUserPasswordResetEmail,
  userPasswordReset,
  sendVerifyUserAccountEmail,
  verifyUserAccount,
  logoutUser,
  addUserAddress,
} = require('../controllers/userController.js');
const verifyUser = require('../middleware/verifyUser.js');

const router = express.Router();

// Public
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/login-with-token').post(loginWithToken);
router.route('/logout').get(logoutUser);
router.route('/send-email-reset-password').post(sendUserPasswordResetEmail);
router.route('/reset-password/:id/:token').post(userPasswordReset);
router.route('/verify-account/:id/:token').post(verifyUserAccount);

// Private
router.route('/change-password').post(verifyUser, changePassword);
router.route('/current-user').post(verifyUser, getUser);
router.route('/address').post(verifyUser, addUserAddress);
router
  .route('/send-email-verify-account')
  .post(verifyUser, sendVerifyUserAccountEmail);

module.exports = router;
