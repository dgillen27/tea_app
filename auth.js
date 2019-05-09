const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./models')

const SALT = 10;
const SECRET = 'myLittleSecret';

const hashPassword = async (password) => {
  const passwordDigest = await bcrypt.hash(password, SALT);
  console.log(passwordDigest);
  return passwordDigest;
}

// hashPassword('somepassword')


const genToken = (payload) => {
  const token = jwt.sign(payload, SECRET)
  console.log(token);
  return token
}

// genToken('words')

const comparePassword = async (password, passwordDigest) => {
  const isValid = await bcrypt.compare(password, passwordDigest)
  return isValid;
}

const restrict = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, SECRET);
    const user = await User.findByPk(data.id);
    res.locals.user = user
    next();
  }
  catch(e) {
    console.log(e);
    res.status(401).send('Not Authorized')
  }
}

module.exports = {
  hashPassword,
  genToken,
  comparePassword,
  restrict
}
