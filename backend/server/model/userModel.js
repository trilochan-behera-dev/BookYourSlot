const mongoose = require("mongoose");

// const res = require("express/lib/response");

var schema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },

  age: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
  },
  adhaar: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not supported",
    },
  },

  userType: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "{VALUE} is not supported",
    },
    default: "user",
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vaccineSlot",
  },
});

const Userdb = mongoose.model("users", schema);

module.exports = Userdb;
