const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const _ = require("lodash");
const { Schema } = mongoose;
const { privateKey, saltRounds } = require("../config");
const validator = require("validator");

const signInToken = util.promisify(jwt.sign);
const validate = util.promisify(jwt.verify);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Enter your username"],
    },
    email: {
      type: String,
      required: [true, "Enter your email"],
      unique: [true, "This email aleady exist"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Enter your Password"],
    },
    list: {
      type: Array,
    },
    logs: {
      type: Array,
    }
    
  },
  {
    toJSON: {
      transform: (doc, ret) => _.omit(ret, ["__v", "password"]),
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, +saltRounds);
  }
  next();
});

userSchema.methods.checkPassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return signInToken({ id: this.id }, privateKey, { expiresIn: "2h" });
};

userSchema.statics.getUserFromToken = async function (token) {
  const User = this;
  const { id } = await validate(token, privateKey);
  const user = await User.findById(id);
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
