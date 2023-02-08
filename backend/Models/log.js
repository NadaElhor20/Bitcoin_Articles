const { mongoose } = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;


const logSchema = new Schema(
  {
    date: {
      type: Date,
      default:Date.now(),
      requird:true
    },
    message: {
      type: String,
      requird:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref:"User",
        index:true,
        requird:true

    },
  },
  {
    toJSON: {
      transform: (doc, ret) => _.omit(ret, ["__v"]),
    },
  }
);


const Log = mongoose.model("Log", logSchema);

module.exports = Log;
