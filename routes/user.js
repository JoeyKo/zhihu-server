const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const User = require("../models/user")
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
router.route('/me')
  .get(authenticate, async (req, res) => {
    const { uid } = res.locals
    const profile = await User.findById(uid).select({
      email: 1,
      gender: 1
    })
    successResponseWithData(res, null, { data: profile })
  })

  .put(authenticate, async (req, res) => {
    const { avatar } = req.body
    // replace tmp tag to avatar
    await cloudinary.uploader.replace_tag('avatar', [avatar]);
    // move tmp file to avatar folder
    const avatarRenamed = await cloudinary.uploader.rename(avatar, `avatar/${avatar}`);
    // cron run 
    successResponseWithData(res, null, { data: avatarRenamed })
  })


module.exports = router;  
