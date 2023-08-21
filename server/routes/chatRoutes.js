const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup } = require('../controllers/chatController');
const router = express.Router();

router.route('/').post(accessChat);
router.route('/:id').get(fetchChats);
router.route('/group/:id').post(createGroupChat);
router.route('/rename').put(renameGroupChat);
router.route('/groupadd').put(addToGroup);
router.route('/groupremove').put(removeFromGroup);


module.exports = router;