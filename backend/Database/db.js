const mongoose = require("mongoose");
const { mongoUrl } = require("../config");
const terminalLogger=require("../middleware/logger")
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl)
  .then(() => {
    terminalLogger.info("connected to Mongo Successfuly");
  })
  .catch((err) => {
    terminalLogger.error(err);
    process.exit(1);
  });
