const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');
const SendNotification = require('./SendNotification');

router.post("/AddRequest", async (request, response) => {
    try {
        const result = await Books.updateMany({ _id: request.body.bookID }, { $push: { requests:request.body} }).exec();
        const BooksData = await Books.find({ _id: request.body.bookID }).populate('userID', { password: 0 }).populate('requests.userID', { password: 0 }).exec()
        response.json({ isAdd: true, data: BooksData[0]}); 
        const userData = await Users.find({ _id: { $ne: request.body.userID }, city: BooksData[0].userID.city }, { fcmToken: 1 }).exec();
        let fcmToken = [];
        for (i = 0; i < userData.length; i++) {
            if (userData[i].fcmToken != '') {
                fcmToken.push(userData[i].fcmToken);
            }
        }
        const data = {
            type: 'ADD_UPDATE_BOOK_DEAL_BY_BUYER',
            updateBook: BooksData[0],
        }
        const sender = await Users.find({ _id: request.body.userID }, {firstName: 1, lastName: 1 }).exec();
        const reciever = await Users.find({ _id: BooksData[0].userID._id }, { fcmToken: 1 }).exec();
        const notification = {
            title: sender[0].firstName + " " + sender[0].lastName + " sent the request",
             body:"Wants to by book " + BooksData[0].title,
        }
        await SendNotification(fcmToken, data, {})
        if (reciever[0].fcmToken != '') {
            await SendNotification([reciever[0].fcmToken], { type: "ONLY_NOTIFICATION" }, notification)
        }
    } catch (error) {
        response.status(500).json('0');
    }
    
});
module.exports = router;