const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  order_id: {
    type: String, 
    required: true,
  },
  user_id: {
    type: String, 
    required: true,
  },
  details: {
    type: Object, 
    required: true,
  },
  timestamp: {
    type: Date, 
    default: Date.now,
  },
  
});

const Transactions = mongoose.model('Transactions', transactionSchema);

module.exports = Transactions;
