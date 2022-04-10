const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');
const History=require('../modal/HistoryModal')
const SendNotification = require('./SendNotification');
router.post("/AddReceivedFlag", async (request, response) => {
    try {
        let isSold;
        if (request.body.isConfirm) {
            const result = await Books.updateMany({ _id: request.body.bookID, "requests.userID": request.body.userID }, { isDisplay: false, $set: { "requests.$.received": true, "requests.$.status": 4, status: 4 } }).exec();
            isSold=true;
        } else {
            const result2 = await Books.updateMany({ _id: request.body.bookID, "requests.userID": request.body.userID }, { $set: { "requests.$.deliverd": false, "requests.$.status": 40, status: 40 } }).exec();
            isSold=false;
        }
        const BooksData = await Books.find({ _id: request.body.bookID }).populate('userID', { password: 0 }).populate('requests.userID', { password: 0 }).exec()
        response.json({ isAdd: true, isSold: isSold, data: BooksData[0] });
        const userData = await Users.find({ _id: { $ne: request.body.userID }, city: BooksData[0].userID.city }, { fcmToken: 1 }).exec();
        let fcmToken = [];
        for (i = 0; i < userData.length; i++) {
            if (userData[i].fcmToken != '') {
                fcmToken.push(userData[i].fcmToken);
            }
        }
        if (request.body.isConfirm) {
            const obj = {
                sellerID: BooksData[0].userID._id,
                buyerID: request.body.userID,
                title: BooksData[0].title,
                price: BooksData[0].price,
                condition: BooksData[0].condition,
                description: BooksData[0].description,
                coverURL: BooksData[0].coverURL
            }
            var HistoryData = new History(obj);
            await HistoryData.save();
            await Books.deleteOne({ _id: request.body.bookID }).exec();
        }
        const data = {
            type: request.body.isConfirm ? 'BOOK_SOLD' : 'ADD_UPDATE_BOOK_DEAL_BY_BUYER',
            updateBook: BooksData[0],
        }
        const sender = await Users.find({ _id: request.body.userID }, { firstName: 1, lastName: 1 }).exec();
        const reciever = await Users.find({ _id: BooksData[0].userID._id }, { fcmToken: 1 }).exec();
        const notification = {
            title: request.body.isConfirm ? "Delivery confirmed" : "Delivery rejected",
            body: request.body.isConfirm ? sender[0].firstName + " " + sender[0].lastName + " confirmed delivery for book " + BooksData[0].title : sender[0].firstName + " " + sender[0].lastName + " did not confirm delivery for book " + BooksData[0].title,
        }
        await SendNotification(fcmToken, data, {})
        if (reciever[0].fcmToken != '') {
            await SendNotification([reciever[0].fcmToken], { type: "ONLY_NOTIFICATION" }, notification)
        }
    } catch (error) {
        console.log(error)
        response.status(500).json('0');
    }
});
module.exports = router;