const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  course: {
    type: String,
    required: true,
    trim: true
  }
});

// Export model
module.exports = mongoose.model('Student', studentSchema);
