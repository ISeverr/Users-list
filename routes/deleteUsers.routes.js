const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.post("/deleteUsers/", async (req, res) => {
  try {
    // if (id.match(/^[0-9a-fA-F]{24}$/)) {
    //   // Yes, it's a valid ObjectId, proceed with `findById` call.
    // }
    const { _id } = req.body
     await User.deleteMany({ _id });
    res.send("user deleted");
  } catch (e) {
    res.status(500).json({ message: "Error delete users" });
    console.log(e);
    message(e);
  }
});

module.exports = router;