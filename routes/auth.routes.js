const { Router } = require("express");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

const userData = {
  registrationDate: new Date().toISOString(),
  userStatus: "user status plug",
  loginDate: new Date().toISOString()
};

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect password").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      console.log("Body", req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      const { email, password, nickname,  } = req.body;
      const person = await User.findOne({ email });

      if (person) {
        return res.status(400).json({
          message: "User with this email or nickname is already registered",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 6);
      const user = new User({
        email,
        password: hashedPassword,
        nickname,
        userStatus: userData.userStatus,
        registrationDate: userData.registrationDate,
        loginDate: userData.loginDate

      });

      await user.save();

      const newUser = await User.findOne({ email });
      const token = jwt.sign(
        {
          userId: newUser.id,
        },
        config.get("jwtSecret"),
        {
          expiresIn: "1h",
        }
      );

      return res.status(201).json({
        message: "user create",
        token,
        user: {
          userId: newUser.id,
          nickname: newUser.nickname,
          registrationDate: newUser.registrationDate,
          userStatus: newUser.userStatus,
          loginDate: newUser.loginDate
        },
      });
    } catch (e) {
      res.status(500).json({ message: "Errasdadasdor" });
      console.log(e);
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data",
        });
      }

      const { email, password,  } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatchPassword = await bcrypt.compare(password, user.password);

      if (!isMatchPassword) {
        return res.status(400).json({ message: "Wrong password" });
      }

      const newUser = await User.findOne({ email });
      const loginDateUpdate = await User.findOneAndUpdate( {email:req.body.email}, {loginDate: new Date().toISOString()});
      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get("jwtSecret"),
        {
          expiresIn: "1h",
        }
      );

      res.json({
        message: "user dsadadsa",
        token,
        user: {
          userId: newUser.id,
          nickname: newUser.nickname,
          userStatus: newUser.userStatus,
          loginDate: loginDateUpdate.loginDate,
        },
      });
    } catch (e) {
      res.status(500).json({ message: "Error" });
      console.log(e);
    }
  }
);

module.exports = router;
