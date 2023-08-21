const express = require("express");
const {
  sendMessage,
  allMessages,
  getLatestMessage,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/:id", sendMessage);
router.get("/:chatId", allMessages);

module.exports = router;
