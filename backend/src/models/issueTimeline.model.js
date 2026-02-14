const mongoose = require("mongoose");

const issueTimelineSchema = new mongoose.Schema(
  {
    issueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      required: true
    },

    status: {
      type: String,
      required: true
    },

    updatedBy: {
      type: String, // Resident | Official | Department
      default: "Resident"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("IssueTimeline", issueTimelineSchema);
