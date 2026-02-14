const express = require("express");
const router = express.Router();
const {
  createIssue,
  getAllIssues,
  updateIssueStatus,
  upvoteIssue
} = require("../controllers/issue.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.post("/", authMiddleware, createIssue);
router.get("/", authMiddleware, getAllIssues);
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("OFFICIAL"),
  updateIssueStatus
);
router.post(
  "/:id/upvote",
  authMiddleware,
  upvoteIssue
);

module.exports = router;
