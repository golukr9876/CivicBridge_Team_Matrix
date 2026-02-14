const IssueTimeline = require("../models/issueTimeline.model");

exports.getIssueTimeline = async (req, res) => {
  try {
    const timeline = await IssueTimeline.find({
      issueId: req.params.issueId
    }).sort({ createdAt: 1 });

    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
