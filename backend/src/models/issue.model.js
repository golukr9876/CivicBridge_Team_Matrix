const mongoose = require("mongoose");
const { ISSUE_STATUS, ISSUE_CATEGORY } = require("../config/constants");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: Object.values(ISSUE_CATEGORY),
      required: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true
      }
    },

    address: {
      type: String
    },

    imageUrl: {
      type: String
    },

    status: {
      type: String,
      enum: Object.values(ISSUE_STATUS),
      default: ISSUE_STATUS.SUBMITTED
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    upvotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    upvoteCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);


issueSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Issue", issueSchema);
