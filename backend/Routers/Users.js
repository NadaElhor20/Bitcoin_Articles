const express = require("express");
require("express-async-errors");
const moment = require("moment");
const User = require("../Models/user");
const Popular = require("../Models/popular");
const Log = require("../Models/log");
const validateUser = require("../Controllers/users");
const AuthorizedUser = require("../middleware/userAuthorization");
const customError = require("../Helper/ErrorHandeler.js");
const terminalLogger = require("../middleware/logger");
const router = express.Router();

router.post("/", validateUser, async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  const createdUser = await user.save();
  res.status(200).send(createdUser);
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const { method, originalUrl } = req;
  const user = await User.findOne({ email });
  const userId = user._id.toString();
  if (!user) throw new customError("invalid email or password", 401);
  const match = await user.checkPassword(password);
  if (!match) {
    const log = new Log({ message: "Failure to login", userId });
    await log.save();
    terminalLogger.error({ email, method, originalUrl }, "Failure to login");
    throw new customError("invalid email or password", 401);
  }
  const token = await user.generateToken();
  const log = new Log({ message: "Login Successfully", userId });
  await log.save();
  terminalLogger.info({ email, method, originalUrl }, "Login Successfully");
  res.status(200).send({ user, token });
});

router.get("/profile", AuthorizedUser, async (req, res) => {
  const authentication = req.headers.authentication;
  const user = await User.getUserFromToken(authentication);
  const userId = user._id.toString();
  const data = await Log.find({ userId }).sort({ date: -1 }).limit(10);
  const logs = data.map((ele) => {
    const date = moment(ele.date).format("llll");
    return { date, message: ele.message };
  });

  res.status(200).send({ logs, user });
});

router.get("/:id", AuthorizedUser, async (req, res) => {
  const { id } = req.params;
  const { list } = await User.findById(id);
  
  res.send(list);
});

router.patch("/:id", AuthorizedUser, async (req, res) => {
  const { list } = req.body;
  const { id } = req.params;

  const updated = await User.findByIdAndUpdate(
    id,
    { $addToSet: { list: list } },
    { new: true }
  );
  const popularUpdate = await Popular.updateOne(
    { key: list },
    { $inc: { count: 1 } },
    { upsert: true }
  );
  res.send(updated);
});

router.delete("/:id", AuthorizedUser, async (req, res) => {
  const { list } = req.body;
  const { id } = req.params;
  const updated = await User.findByIdAndUpdate(
    id,
    {
      $pull: { list: list },
    },
    { new: true }
  );
  await Popular.updateOne({ key: list }, { $inc: { count: -1 } });

  res.send(updated);
});

module.exports = router;
