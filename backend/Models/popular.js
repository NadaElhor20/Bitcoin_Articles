const { mongoose } = require("mongoose");
const _ = require("lodash");
const { Schema } = mongoose;


const popularSchema = new Schema(
  {
    key: {
      type: String,
    },
    count: {
      type: Number,
      default: 0
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => _.omit(ret, ["__v"]),
    },
  }
);


const Popular = mongoose.model("Popular", popularSchema);

module.exports = Popular;
