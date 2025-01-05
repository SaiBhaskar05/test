// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  joinedGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  }],
});
module.exports = mongoose.model('Item', itemSchema);
