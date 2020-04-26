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
      const { email, password } = req.body;
      const result = await UserCtrl.createUser(email, password);
      const { status, token, msg } = result;
      if (!status) {
        return errorResponse(res, msg);
      }
      res.cookie("token", token, { httpOnly: true });
      successResponse(res, msg);
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
      const { status, token, msg } = result;
      if (!status) {
        return errorResponse(res, msg);
      }
      res.cookie("token", token, { httpOnly: false })
      successResponse(res, msg);
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
