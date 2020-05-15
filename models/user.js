const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: [6, "Password is too short"],
    select: false
  },
  username: {
    type: String,
    minlength: [1, "Username is too short"],
    maxlength: [10, "Username is too long"],
    trim: true
  },
  gender: {
    type: Number,
    enum: [0, 1], // 0 is female, 1 is male
    default: 1,
  },
  birthday: {
    type: Date,
  },
  headline: {
    type: String,
    minlength: [6, "Headline is too short"],
    maxlength: [50, "Username is too long"],
  },
  role: {
    type: String,
    enum: ['admin', 'guest'],
    default: 'guest'
  },
  avatar_url: {
    type: Schema.Types.ObjectId,
    ref: 'File'
  },
  following: {
    type: Number,
    default: 0,
  },
  follower: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  try {
    console.log('user data: ', this)
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.password = hashedPassword;
    next()
  } catch(err) {
    next(err);
  }
})

userSchema.path('gender').validate(function (value) {
  return [0, 1].indexOf(value) !== -1;
}, 'Invalid gender')

userSchema.methods.comparePassword = function(user, candidatePassword) {
  return bcrypt.compare(candidatePassword, user.password);
}

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
}

module.exports = mongoose.model('User', userSchema);
