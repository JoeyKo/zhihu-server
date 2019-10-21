const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
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

module.exports = mongoose.model('user', userSchema);
