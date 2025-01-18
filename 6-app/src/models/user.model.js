const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
  // email:{}
  username: {
    type: String,
    required: true, // basic validation
    unique: true, // unique index
  },
  password: {
    type: String,
    required: true,
  },
});

// document.hashPassword()
// user.hashPassword()
schema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model('User', schema);

// closure (this), async, prototype
