const Chat = require("../model/ChatModel");
const Message = require("../model/MessageModel");
const User = require("../model/UserModel");

module.exports.sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data");
    return res.status(400).json("Insufficient data");
  }
  var newMessage = {
    sender: req.params.id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    await message.populate("chat");
    message.chat = await User.populate(message.chat, {
      path: "users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.json(message);
  } catch (ex) {
    next(ex);
  }
};

module.exports.allMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email pic")
      .populate("chat");
      messages.chat = await User.populate(messages.chat, {
          path: "users",
          select: "name pic email",
      });
    res.json(messages);
  } catch (ex) {
    next(ex);
  }
};



