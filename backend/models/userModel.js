const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Intern", "Contract"],
      default: "Full Time",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
});

const User = mongoose.model('User', userSchema)

module.exports = User;