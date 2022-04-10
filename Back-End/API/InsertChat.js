const express = require('express');
const router = express.Router()
const Mongoose = require('mongoose');
const Chats = require('../modal/ChatModal');
const Users = require('../modal/UserDetailsModal');
const Books = require('../modal/BookDetailsModal')
const SendNotification = require('./SendNotification');
router.post("/InsertChat", async (request, response) => {
    try {
        var chatData = new Chats(request.body);
        await chatData.save();
        response.json({ isAdd: true, data: chatData });
        const userData = await Users.find({ _id: request.body.receiverID }, { fcmToken:1}).exec()
        const bookData = await Books.find({ _id: request.body.bookID }, {title:1}).exec()
        if (userData[0].fcmToken !=''){
            const data = {
                type: 'Insert_Chat',
                chat: chatData
            }
            const sender = await Users.find({ _id: request.body.senderID }, { fcmToken: 1, firstName: 1, lastName: 1 }).exec()
            const notification = {
                title: bookData[0].title ,
                body: sender[0].firstName + " " + sender[0].lastName +" sent a message",
            }
            await SendNotification([userData[0].fcmToken], data, {})
            await SendNotification([userData[0].fcmToken], {type:"ONLY_NOTIFICATION"}, notification)
        }
    } catch (error) {
        console.log(error)
        response.status(500).json('0');
    }
});
module.exports = router;