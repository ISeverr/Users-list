const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.get("/getUsers", async (req, res) => {
  try {
    User.find({}, function (err, users) {
      let userArray = [];

      users.forEach((user) => {
        userArray.push(user);
      });

      res.send(userArray);
    });
  } catch (e) {
    res.status(500).json({ message: "Error get list of users" });
    console.log(e);
  }
});

module.exports = router;