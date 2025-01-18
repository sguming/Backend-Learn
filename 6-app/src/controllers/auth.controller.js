const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    res.status(401).json({ error: 'invalid credentials' });
    return;
  }
  const valid = await user.comparePassword(password);
  if (!valid) {
    // fail fast
    res.status(401).json({ error: 'invalid credentials' });
    return;
  }
  const token = generateToken({ _id: user._id, username: user.username });
  res.json({ token });
};

const register = async (req, res) => {
  const { username, password } = req.body;

  // mongoose document object
  const user = new User({ username, password });
  // validation - mongoose (save())
  await user.hashPassword();
  await user.save();

  res.sendStatus(201);
  // send email
  // user : {verified: boolean, email: string}
};

module.exports = {
  login,
  register,
};
