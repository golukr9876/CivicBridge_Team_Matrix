const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getIssueTimeline
} = require("../controllers/timeline.controller");

router.get("/:issueId", authMiddleware, getIssueTimeline);

module.exports = router;
