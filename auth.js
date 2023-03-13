const jwt = require('jsonwebtoken');

const User = require('./userModel');
require('dotenv').config({ path: '.env' });

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Please login to access this resource' });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (err) {
    return console.log('Error-->>>', err);
  }
};
