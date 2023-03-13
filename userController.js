const User = require('./userModel');

exports.registerUser = async (req, res) => {
  const { first_Name, last_Name, email, password, age, gender, dob, mobile } =
    req.body;

  const user = await User.create({
    first_Name,
    last_Name,
    email,
    password,
    age,
    gender,
    dob,
    mobile,
  });

  let token = user.getJWTToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'Invalid Credential' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid Credential' });
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid Credential' });
  }

  let token = user.getJWTToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
};

exports.getUserData = async (req, res) => {
  const userDetail = await User.findById(req.user.id);
  res.status(200).json({ userDetail });
};

exports.userProfile = async (req, res) => {
  const { first_Name, last_Name, email, age, gender, dob, mobile } = req.body;

  const userData = { first_Name, last_Name, email, age, gender, dob, mobile };

  await User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true });
};

//logout user

exports.logout = async (req, res, next) => {
  localStorage.removeItem('token');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

exports.deleteAccount = async (req, res, next) => {
  localStorage.removeItem('token');

  const user = await User.findByIdAndDelete(req.user._id);

  user.save();
  res.status(200).json({
    success: true,
    msg: 'Account Deleted Successfully',
  });
};
