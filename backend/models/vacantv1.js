const mongoose = require("mongoose");
const vacantnotify = new mongoose.Schema({
    status: {
      type: String,
      required: true,
    },
    bt_no: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });
  
const Vacantnotifyv1 = mongoose.model("vacantnotifyv1", vacantnotify);
Vacantnotifyv1.createIndexes();