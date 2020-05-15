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
      res.cookie("token", token, { httpOnly: true });
      successResponseWithData(res, msg, { profile: data });
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
      res.cookie("token", token, { httpOnly: false })
      successResponseWithData(res, msg, { profile: data });
    } catch (err) {
      errorResponse(res, err.message)
    }
  })

// logout
router.route('/logout')
  .post(authenticate, async (req, res) => {
    const { uid } = res.locals
    const { token } = req.cookies;

    await UserCtrl.userLogout(uid, token);
    res.clearCookie('token')
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
