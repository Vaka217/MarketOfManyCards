const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, nickname, contact } = req.body;

  try {
    const user = await User.create({ email, password, nickname, contact });

    const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY");
    res.send({ userId: user.id, token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(422).send({ error: "Invalid password or email" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(422).send({ error: "Invalid password or email" });
    }

    const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY");
    res.send({ userId: user.id, token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
