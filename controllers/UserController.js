const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SendMail = require("../utils/NodeMailer");
const generateToken = require("../utils/Token");
require("dotenv").config();

const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: {
      token: generateToken(user),
      user: user.username
    }});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const RegisterUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (user.isAuthenticated) {
        return res.status(400).json({ error: "User already exists" });
      } else {
        const token = generateToken(user);
        await SendMail(user.username, token, "login");
        return res.status(200).json({ message: "Please verify your email!" });
      }
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    const token = generateToken(newUser);
    const nodemailerRes = await SendMail(req.body.username, token, "login");
    if (nodemailerRes) {
      res.status(200).json({ message: "Please verify your email!" });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const VerifyUser = async (req, res) => {
  try {
    const verify = jwt.verify(req.query.id, process.env.LoginSecret);
    const user = await User.findById(verify.id);
    user.isAuthenticated = true;
    await user.save();
    res.status(200).json({ message: "User verified" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  LoginUser,
  RegisterUser,
  VerifyUser,
};
