const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/UserController');
const authenticate = require('../middlewares/Authenticate')
const { requestResponseHandler } = require('../handlers')
const { successResponse, errorResponse, successResponseWithData } = requestResponseHandler

// regist
router.route('/regist')
  .post(async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const result = await UserCtrl.createUser(email, password, role);
      const { status, token, data, msg } = result;
      if (!status) {
        return errorResponse(res, msg);
      }
      successResponseWithData(res, msg, { profile: data, token });
    } catch (err) {
      if (err.name === 'ValidationError') {
        errorResponse(res, err.message)
      }
    }
  });

// login
router.route('/login')
  .post(async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await UserCtrl.userLogin(email, password);
      const { status, token, data, msg } = result;
      if (!status) {
        return errorResponse(res, msg);
      }
      successResponseWithData(res, msg, { profile: data, token });
    } catch (err) {
      errorResponse(res, err.message)
    }
  })

// logout
router.route('/logout')
  .post(authenticate, async (req, res) => {
    const { uid } = res.locals
    const token = req.headers.authorization;

    await UserCtrl.userLogout(uid, token);
    successResponse(res, 'logout successfully!')
  })


// profile 
router.route('/profile')
  .get(authenticate, async (req, res) => {
    const { uid } = res.locals
    const profile = await UserCtrl.getProfile(uid)
    successResponseWithData(res, null, { profile })
  })

  .put(authenticate, async (req, res) => {
    try {
      const { uid } = res.locals
      await UserCtrl.updateProfile(uid, req.body);
      successResponse(res, 'profile update successfully!');
    } catch (err) {
      errorResponse(res, err.message)
    }
  })

module.exports = router;  
