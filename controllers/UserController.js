const jwt = require('jsonwebtoken');
const User = require('../models/user')
const { redis, redisClient } = require('../db/redis')

class UserController {
  constructor() {
  }

  static async createUser(email, password, role) {
    const userExist = await User.findOne({ email })
    if (userExist) {
      return { status: 0, msg: `user ${email} already exists!` };
    }

    const newUser = new User({ email, password, role });
    const userCreated = await newUser.save();
    const token = generateAndStoreToken(userCreated)
    redisClient.set(`${userCreated.id}_${token}`, true, redis.print);

    return { status: 1, msg: 'User create successfully!', token, data: userCreated }
  }

  static async userLogin(email, password) {
    const userOnlyPwd = await User.findOne({ email }).select('password')
    console.log(userOnlyPwd)
    if (!userOnlyPwd) {
      return { status: 0, msg: 'user not exist!' };
    }
    const isMatched = await userOnlyPwd.comparePassword(userOnlyPwd, password)
    if (isMatched) {
      redisClient.scan('0', 'MATCH', `${userOnlyPwd.id}_*`, (err, results) => {
        if (!err) results.map(item => redisClient.del(item))
      })
      const token = generateAndStoreToken(userOnlyPwd)
      redisClient.set(`${userOnlyPwd.id}_${token}`, true, redis.print);

      const userProfile = await User.findById(userOnlyPwd.id)
      return { status: 1, token, data: userProfile, msg: 'login successfully!' }
    } else {
      return { status: 0, msg: 'wrong passwrod!' };
    }
  }

  static async userLogout(uid, token) {
    redisClient.del(`${uid}_${token}`, redis.print)
  }

  static async getProfile(uid) {
    return await User.findById(uid)
  }

  static async updateProfile(id, user) {
    //  // replace tmp tag to avatar
    //  await cloudinary.uploader.replace_tag('avatar', [avatar]);
    //  // move tmp file to avatar folder
    //  return await cloudinary.uploader.rename(avatar, `avatar/${avatar}`);
    console.log(id, user)
    return await User.updateOne({ _id: id }, { $set: user }, { runValidators: true })
  }
}

function generateAndStoreToken(user) {
  return jwt.sign({
    uid: user.id,
    role: user.role
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  })
}
module.exports = UserController
