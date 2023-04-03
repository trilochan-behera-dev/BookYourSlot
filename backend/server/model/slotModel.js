const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  date: {
    type: String,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "confirmed", "cancel"],
      message: "{VALUE} is not supported",
    },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Slotdb = mongoose.model("slot", schema);

module.exports = Slotdb;
