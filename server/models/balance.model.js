// models/Balance.js
import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  nidBalance: {
    type: Number,
    default: 0
  },
  serverBalance: {
    type: Number,
    default: 0
  }
});

const Balance = mongoose.model('Balance', balanceSchema);

export default Balance;
