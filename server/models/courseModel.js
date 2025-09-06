import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "Admin"
  }
});

export const Course = mongoose.model("Course", courseSchema);
