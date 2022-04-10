const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');
const SendNotification = require('./SendNotification');
router.post("/AddDeliverdFlag", async (request, response) => {
    try {
        const result = await Books.updateMany({ _id: request.body.bookID, "requests.userID": request.body.userID }, { $set: { "requests.$.deliverd": true, "requests.$.status": 3 ,status:3,} }).exec();
        const BooksData = await Books.find({ _id: request.body.bookID }).populate('userID', { password: 0 }).populate('requests.userID', { password: 0 }).exec()
        response.json({ isAdd: true, data: BooksData[0] });
        const userData = await Users.find({ _id: { $ne: BooksData[0].userID._id }, city: BooksData[0].userID.city }, { fcmToken: 1 }).exec();
        let fcmToken = [];
        for (i = 0; i < userData.length; i++) {
            if (userData[i].fcmToken != '') {
                fcmToken.push(userData[i].fcmToken);
            }
        }
        console.log(fcmToken);
        const data = {
            type: 'ADD_UPDATE_BOOK_DEAL_BY_SELLER',
            updateBook: BooksData[0],
        }
        const notification = {
            title: "Book " + BooksData[0].title+" Delivered" ,
            body: "Please confirm the delivery",
        }
        await SendNotification(fcmToken, data, {})
        const reciever = await Users.find({ _id: request.body.userID }, { fcmToken: 1 }).exec();
        if (reciever[0].fcmToken != '') {
            await SendNotification([reciever[0].fcmToken], { type: "ONLY_NOTIFICATION" }, notification)
        }
    } catch (error) {
        console.log(error)
        response.status(500).json('0');
    }
});
module.exports = router;