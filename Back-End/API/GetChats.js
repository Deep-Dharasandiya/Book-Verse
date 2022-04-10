const express = require('express');
const router = express.Router()
const Chats = require('../modal/ChatModal');
router.post("/GetChats", async (request, response) => {
    try {
        let date;
        if (request.body.date == "current") {
            date = new Date();
        } else {
            date = new Date(request.body.date);
        }
        var ChatData = await Chats.find({ bookID: request.body.bookID, $or: [{ "senderID": request.body.userID1 }, { "senderID": request.body.userID2 }], $or: [{ "receiverID": request.body.userID1 }, { "receiverID": request.body.userID2 }], date: { $lt: date } }).sort({ date: -1 }).limit(20).exec()
        response.json(ChatData);
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;