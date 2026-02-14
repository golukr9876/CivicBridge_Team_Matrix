const Issue = require("../models/issue.model");
const IssueTimeline = require("../models/issueTimeline.model");
const { ISSUE_STATUS } = require("../config/constants");
const mongoose = require("mongoose");

exports.createIssue = async (req, res) => {
  try {
    const { title, description, category, location, address, imageUrl } =
      req.body;

    const issue = await Issue.create({
      title,
      description,
      category,
      location,
      address,
      imageUrl,
      createdBy: req.user.id
    });

     await IssueTimeline.create({
      issueId: issue._id,
      status: issue.status,
      updatedBy: "Resident"
    });

    res.status(201).json({
      message: "Issue reported successfully",
      issue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const STATUS_FLOW = {
  SUBMITTED: ISSUE_STATUS.ACKNOWLEDGED,
  ACKNOWLEDGED: ISSUE_STATUS.ASSIGNED,
  ASSIGNED: ISSUE_STATUS.IN_PROGRESS,
  IN_PROGRESS: ISSUE_STATUS.RESOLVED
};

exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const allowedNextStatus = STATUS_FLOW[issue.status];

    if (status !== allowedNextStatus) {
      return res.status(400).json({
        message: `Invalid status transition from ${issue.status} to ${status}`
      });
    }

    issue.status = status;
    await issue.save();

    await IssueTimeline.create({
      issueId: issue._id,
      status,
      updatedBy: "Official"
    });

    res.json({
      message: "Status updated successfully",
      issue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    // ❌ already upvoted
    if (issue.upvotes.includes(userId)) {
      return res.status(400).json({
        message: "You have already upvoted this issue"
      });
    }

    issue.upvotes.push(userId);
    issue.upvoteCount = issue.upvotes.length;

    await issue.save();

    res.json({
      message: "Issue upvoted successfully",
      upvoteCount: issue.upvoteCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
