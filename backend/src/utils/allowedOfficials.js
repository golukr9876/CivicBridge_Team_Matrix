const fs = require("fs");
const path = require("path");

let allowedList = null;

/**
 * Load allowed officials from CSV (email, username).
 * Only these email+username pairs can sign up as OFFICIAL.
 * @returns {Array<{ email: string, username: string }>}
 */
function loadAllowedOfficials() {
  if (allowedList) return allowedList;

  const csvPath =
    process.env.ALLOWED_OFFICIALS_CSV ||
    path.join(__dirname, "../../data/allowed-officials.csv");

  if (!fs.existsSync(csvPath)) {
    allowedList = [];
    return allowedList;
  }

  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.split(/\r?\n/).filter((line) => line.trim());

  if (lines.length < 2) {
    allowedList = [];
    return allowedList;
  }

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(",").map((s) => s.trim());
    const email = (parts[0] || "").toLowerCase();
    const username = (parts[1] || "").toLowerCase();
    if (email && username) {
      rows.push({ email, username });
    }
  }

  allowedList = rows;
  return allowedList;
}

/**
 * Check if the given email and username (name) are in the allowed officials list.
 * Comparison is case-insensitive.
 */
function isAllowedOfficial(email, username) {
  const list = loadAllowedOfficials();
  const emailNorm = (email || "").toLowerCase();
  const usernameNorm = (username || "").toLowerCase();
  return list.some(
    (row) => row.email === emailNorm && row.username === usernameNorm
  );
}

module.exports = { loadAllowedOfficials, isAllowedOfficial };
