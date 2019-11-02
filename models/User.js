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
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6
  }
},{ timestamps:true });

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

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

module.exports = mongoose.model('user', userSchema);
