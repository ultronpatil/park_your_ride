
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Razorpay = require('razorpay');
const app = express();
dotenv.config({ path: './config.env' });
const vac1 = require('./models/vacantv1');

const Transactions = require('./models/Transactions'); // Import your Transactions model
const V1 = require('./models/vacantv1');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.use(express.json());

app.use(require('./routes/auth'));
const vacantv1Routes = require('./routes/vacant');
app.use('/vacantv1', vacantv1Routes);
const userInfoRoute = require('./routes/userinfo');
app.use('/userinfo', userInfoRoute);

const PORT = process.env.PORT;


const createOrder = async (req, res) => {
  const amount = parseInt(req.body.amount) * 100; // Convert the amount to the smallest unit (e.g., paise for INR)
  const currency = req.body.currency;

  // Define options for creating the Razorpay order
  const options = {
    amount,
    currency,
    receipt: 'your_receipt_id', // You can set a unique receipt ID as per your needs
  };

  try {
    // Create the order using the Razorpay SDK
    const instance = await razorpay.orders.create(options);

    if (instance) {
      const order_id = instance.id;
      const user_id = 'your_user_id'; // Set the user ID as per your authentication logic

      // Create a new transaction record and save it to the database
      const transaction = new Transactions({ order_id, user_id, details: instance });
      await transaction.save();

      // Show order details in the console
      console.log('Razorpay Order Details:', instance);

      res.status(200).json(instance);
    } else {
      res.status(500).json({ error: 'Failed to create the order' });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create the order' });
  }
};









// Create a route for creating Razorpay orders
app.post('/create-order', Transactions);

app.get('/', (req, res) => {
  res.send(`Hello world from server router app`);
});

// Add your Razorpay webhook handling code here (if needed)

app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const express = require('express');
// const Razorpay = require('razorpay');
// const app = express();
// dotenv.config({ path: './config.env' });
// require('./db/conn');
// // Create a Transactions model
// const Transactions = mongoose.model('Transactions', {
//   order_id: String,
//   user_id: String,
//   details: Object,
// });

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

// app.use(express.json());

// app.post('/create-order', async (req, res) => {
//   const { amount, currency, user_id } = req.body;

//   // Convert the amount to the smallest unit (e.g., paise for INR)
//   const amountInPaise = parseInt(amount) * 100;

//   // Define options for creating the Razorpay order
//   const options = {
//     amount: amountInPaise,
//     currency,
//     receipt: 'your_receipt_id', // You can set a unique receipt ID as per your needs
//   };

//   try {
//     // Create the order using the Razorpay SDK
//     const instance = await razorpay.orders.create(options);

//     if (instance) {
//       const order_id = instance.id;

//       // Create a new transaction record and save it to the database
//       const transactions = new Transactions({ order_id, user_id, details: instance });
//       await transactions.save();

//       // Show order details in the console
//       console.log('Razorpay Order Details:', options);

//       res.status(200).json(options);
//     } else {
//       res.status(500).json({ error: 'Failed to create the order' });
//     }
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ error: 'Failed to create the order' });
//   }
// });



// const vacantnotify = new mongoose.Schema({
//   status: {
//     type: String,
//     required: true,
//   },
//   bt_no: {
//     type: String,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },

// });

// const Vacantnotifyv1 = mongoose.model("vacantnotifyv1", V1);
// Vacantnotifyv1.createIndexes();
// app.post("/vacantv1", async (req, res) => {
//   try {
//     console.log("datais", req.body)
//     // const vacantnotifyv1 = new Vacantnotifyv1(req.body);
//     const data = await V1.find(req.body);
//     console.log(data);
//     if (data) {
//       const datadel = await Vacantnotifyv1.findOneAndDelete(req.body);
//       if (datadel) {
//         console.log("data deleted");
//       } else if (datadel == null) {
//         let result = await vacantnotifyv1.save();
//         console.log("saving");
//         result = result.toObject();
//         const id = JSON.stringify(result._id);
//         //console.log(id);
//         if (result) {
//           res.json({ message: "state changed", data: result });
//         } else {
//           console.log("state changed");
//         }
//       } else {
//         console.log("neutral");
//       }
//     } else {


//     }
//   } catch (e) {
//     console.log("wrong");
//     res.json({ message: "wrong " });
//   }
// });

















// const PORT = process.env.PORT;

// app.get('/', (req, res) => {
//   res.send(`Hello world from server router app`);
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
