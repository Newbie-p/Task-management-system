import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
     title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    dueDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
}, {timestamps: true});

export default mongoose.model("Task", taskSchema);