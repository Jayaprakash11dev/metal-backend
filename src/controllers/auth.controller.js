import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const signup = async (req, res) => {
  const {name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User exists' });

  const user = await User.create({name, email, password });
  const token = generateToken(user._id);

  res.status(201).json({ data: user, message:"User Created Successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user._id);
  res.json({ data:{token:token} , message:"Login Successfull"});
};
