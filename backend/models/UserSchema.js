const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  conpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  messages: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ],
  pdfReceipts: [{
    type: String, // Store the PDF data as a base64 encoded string
  }],
  bookedSlots: [{
    type: String // Assuming slots are identified by strings
  }],
  slot_number: {
    type: String // Assuming slot_number is a string
  }
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.conpassword = await bcrypt.hash(this.conpassword, 12);
  }
  console.log("password hashed");
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  }
  catch (err) {
    console.log(err);
  }
};

UserSchema.methods.addMessage = async function (name, email, message) {
  try {
    this.messages = this.messages.concat({ name, email, message });
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
};

UserSchema.methods.reserveSlot = async function (slotNumber) {
  try {
    if (!this.bookedSlots.includes(slotNumber)) {
      this.bookedSlots.push(slotNumber);
      this.slot_number = slotNumber; // Update the slot_number
      await this.save();
      return true; // Reservation successful
    } else {
      return false; // Slot already booked by the user
    }
  } catch (error) {
    console.log(error);
    return false; // Error occurred
  }
};

const User = mongoose.model('USER', UserSchema);

module.exports = User;
