const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/UserController');
const authenticate = require('../middlewares/Authenticate')
const { requestResponseHandler } = require('../handlers')
const { successResponse, errorResponse, successResponseWithData } = requestResponseHandler

// regist
router.route('/regist')
  .post(async (req, res) => {
    const { email, password } = req.body;
    const result = await UserCtrl.createUser(email, password);
    const { status, token, data, msg } = result;
    if (!status) {
      return errorResponse(res, msg);
    }
    res.cookie("token", token, { httpOnly: true });
    successResponse(res, msg, data);
  });

// login
router.route('/login')
  .post(async (req, res) => {
    const { email, password } = req.body;
    const result = await UserCtrl.userLogin(email, password);
    const { status, token, msg } = result;
    if (!status) {
      return errorResponse(res, msg);
    }
    res.cookie("token", token, { httpOnly: true })
    successResponse(res, msg);
  })

// logout
router.route('/logout')
  .post(authenticate, async (req, res) => {
    const { uid } = res.locals
    const { token } = req.cookies;

    console.log('redis key: ', `${uid}_${token}`);
    await UserCtrl.userLogout(uid, token);
    res.clearCookie('token')
    successResponse(res, 'logout successfully!')
  })


// me 
router.route('/profile')
  .get(authenticate, async (req, res) => {
    const { uid } = res.locals
    const profile = await UserCtrl.getProfile(uid)
    successResponseWithData(res, null, { profile })
  })

  .put(authenticate, async (req, res) => {
    const { avatar } = req.body;
    const updatedProfile = await UserCtrl.updateProfile(avatar);
    successResponseWithData(res, null, { profile: updatedProfile });
  })


module.exports = router;  
