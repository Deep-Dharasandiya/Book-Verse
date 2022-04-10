const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');
const SendNotification = require('./SendNotification');
router.post("/DeleteRequest", async (request, response) => {
    try {
        var BooksData = await Books.find({ _id: request.body.bookID},{isDisplay:1,requests:1}).exec()
        const tempBooks = (BooksData[0].requests).filter((item) => item.userID == request.body.userID);
        if (tempBooks[0].status == 0 || tempBooks[0].status == 1 || tempBooks[0].status == 20) {
            if (tempBooks[0].status != 0) {
              const a=  await Books.updateMany({ _id: request.body.bookID }, { status: 0, $pull: { requests: { userID: request.body.userID } } }).exec();
            } else {
                const b = await Books.updateMany({ _id: request.body.bookID }, { $pull: { requests: { userID: request.body.userID } } }).exec();
            }

        } else {
            const c = await Books.updateMany({ _id: request.body.bookID }, { isDisplay: true, status: 0, $pull: { requests: { userID: request.body.userID } } }).exec();
            for (i = 0; i < BooksData[0].requests.length; i++) {
                await Books.updateMany({ _id: request.body.bookID, "requests.userID": BooksData[0].requests[i].userID }, { $set: { "requests.$.status": 0 } }).exec();
            }
        }
        const newBooksData = await Books.find({ _id: request.body.bookID }).populate('userID', { password: 0 }).populate('requests.userID', { password: 0 }).exec()
        response.json({ isDelete: true, data: newBooksData[0] });
        const userData = await Users.find({ city: newBooksData[0].userID.city }, { fcmToken: 1 }).exec();
        let fcmToken = [];
        for (i = 0; i < userData.length; i++) {
            if (userData[i].fcmToken != '') {
                fcmToken.push(userData[i].fcmToken);
            }
        }
        console.log(fcmToken);
        const data = {
            type: 'ADD_UPDATE_BOOK_DEAL_BY_BUYER',
            updateBook: BooksData[0],
        }
        const notification = {
            // title: "Add New Bok",
            //body: BooksData[0].title,
        }
        await SendNotification(fcmToken, data, notification)
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;