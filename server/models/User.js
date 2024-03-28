// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    profilePicture: String
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
