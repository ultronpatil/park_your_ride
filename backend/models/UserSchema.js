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
  }

  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      }
    }
  ],
  pdfReceipt: {
    type: String, // Store the PDF data as a base64 encoded string
  }
})


UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.conpassword = await bcrypt.hash(this.conpassword, 12);
  }
  console.log("password hashed");
  next();
})

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
}

UserSchema.methods.addMessage = async function (name, email, message) {
  try {
    this.messages = this.messages.concat({ name, email, message })
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error)
  }
}



const User = mongoose.model('USER', UserSchema);

module.exports = User;