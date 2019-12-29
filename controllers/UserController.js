const jwt = require('jsonwebtoken');
const User = require('../models/user')
const { redis, redisClient } = require('../db/redis')
const cloudinary = require('cloudinary').v2;

class UserController {
  constructor() {
  }

  static async createUser(email, password) {
    const userExist = await User.findOne({ email })
    if (userExist) {
      return { status: 0, msg: `user ${email} already exists!` };
    }

    const newUser = new User({ email, password });
    const userCreated = await newUser.save();
    const token = generateAndStoreToken(userCreated)
    redisClient.set(`${userCreated.id}_${token}`, true, redis.print);

    return { status: 1, token, data: userCreated }
  }

  static async userLogin(email, password) {
    // select('password') => user data with password
    const userExist = await User.findOne({ email }).select('password')
    if (!userExist) {
      return { status: 0, msg: 'user not exist!' };
    }
    const isMatched = await userExist.comparePassword(userExist, password)
    if (isMatched) {
      redisClient.scan('0', 'MATCH', `${userExist.id}_*`, (err, results) => {
        if (!err) results.map(item => redisClient.del(item))
      })
      const token = generateAndStoreToken(userExist)
      redisClient.set(`${userExist.id}_${token}`, true, redis.print);

      return { status: 1, token }
    } else {
      return { status: 0, msg: 'wrong passwrod!' };
    }
  }

  static async userLogout(uid, token) {
    redisClient.del(`${uid}_${token}`, redis.print)
  }

  static async getProfile(uid) {
    return await User.findById(uid).select({
      email: 1,
      gender: 1
    })
  }

  static async updateProfile(avatar) {
     // replace tmp tag to avatar
     await cloudinary.uploader.replace_tag('avatar', [avatar]);
     // move tmp file to avatar folder
     return await cloudinary.uploader.rename(avatar, `avatar/${avatar}`);
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
