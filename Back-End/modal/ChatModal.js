const Mongoose = require('mongoose');
const Chats = Mongoose.model("chats", {
    bookID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Books"
    },
    senderID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    receiverID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = Chats;