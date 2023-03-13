const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  first_Name: {
    type: String,
  },
  last_Name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  mobile: {
    type: String,
    unique: true,
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //update profile
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

require('dotenv').config({ path: '.env' });

if (typeof localStorage === 'undefined' || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
userSchema.methods.getJWTToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return localStorage.setItem('token', token);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
