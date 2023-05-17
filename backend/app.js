const mongoose = require("mongoose");

mongoose.connect(`mongodb://0.0.0.0:27017/testdbv4`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Schema for users of website
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
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("users", UserSchema);
User.createIndexes();

// schema for feedback
const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Feedback = mongoose.model("feedback", FeedbackSchema);
Feedback.createIndexes();

///database connectivity  on onclick button

const vacantnotify = new mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  bt_no: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

const Vacantnotifyv1 = mongoose.model("vacantnotifyv1", vacantnotify);
Vacantnotifyv1.createIndexes();

// For backend and express
const express = require("express");
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
  // You can check backend is working or not by
  // entering http://loacalhost:5000

  // If you see App is working means
  // backend working properly
});

//api signup
app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

//api feedback
app.post("/feedback", async (req, resp) => {
  try {
    const feedback = new Feedback(req.body);
    let result = await feedback.save();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    }
  } catch (e) {
    resp.send("Something Went Wrong");
  }
});

var bcrypt = require("bcrypt");
app.post("/login", async (req, res) => {
  // const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  // console.log(email);
  // console.log(password);
  // Find the user in the database
  const user = await User.findOne({ email, password });
  // console.log("user = ",user);
  if (!user) {
    // If the user is not found, return an error
    return res.status(400).json({ message: "Invalid email " });
  }

  // Compare the password with the hashed password in the database
  // const isMatch = await bcrypt.compare(password, user.password);

  // if (!isMatch) {
  //   // If the password is incorrect, return an error
  //   return res.status(400).json({ message: 'Invalid email or password' });
  // }

  // If the email and password are valid, return a success message
  res.json({ message: "Login successful" });
});

//button stuff starts here

app.post("/vacantv1", async (req, res) => {
  try {
    const vacantnotifyv1 = new Vacantnotifyv1(req.body);
    const data = await Vacantnotifyv1.find(req.body);
    console.log(data);
    if (data) {
      const datadel = await Vacantnotifyv1.findOneAndDelete(req.body);
      if (datadel) {
        console.log("data deleted");
      } else if (datadel == null) {
        let result = await vacantnotifyv1.save();
        console.log("saving");
        result = result.toObject();
        const id = JSON.stringify(result._id);
        //console.log(id);
        if (result) {
          res.json({ message: "state changed", data: result });
        } else {
          console.log("state changed");
        }
      } else {
        console.log("neutral");
      }
    } else {
    }
  } catch (e) {
    console.log("wrong");
    res.json({ message: "wrong " });
  }
});

app.listen(5000);
