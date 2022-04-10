const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');
const SendNotification = require('./SendNotification');
router.post("/AddSellerConfirmation", async (request, response) => {
    try {
        if(request.body.isConfirm){
           await Books.updateMany({ _id: request.body.bookID, "requests.userID": request.body.userID }, { $set: { "requests.$.sellerConformation": true, "requests.$.status": 1, status: 1 } }).exec();
        }else{
            await Books.updateMany({ _id: request.body.bookID, "requests.userID": request.body.userID, "requests.buyerConformation": false}, { $set: { "requests.$.sellerConformation": false, "requests.$.status": 0, status: 0} }).exec();
        }
        const BooksData = await Books.find({ _id: request.body.bookID }).populate('userID', { password: 0 }).populate('requests.userID', { password: 0 }).exec()
        response.json({ isAdd: true, data: BooksData[0] });
        const userData = await Users.find({ _id: { $ne: BooksData[0].userID._id }, city: BooksData[0].userID.city }, { fcmToken: 1 }).exec();
        let fcmToken = [];
        for (i = 0; i < userData.length; i++) {
            if (userData[i].fcmToken!=''){
                fcmToken.push(userData[i].fcmToken);
            }
        }
        console.log(fcmToken);
        const data = {
            type: 'ADD_UPDATE_BOOK_DEAL_BY_SELLER',
            updateBook: BooksData[0],
        }
        const notification = {
            title: request.body.isConfirm ? "Request accepted for book " + BooksData[0].title : "Request revoked for book " + BooksData[0].title,
            body: request.body.isConfirm ? "Kindly confirm the deal with seller " + BooksData[0].userID.firstName + " " + BooksData[0].userID.lastName : "Seller " + BooksData[0].userID.firstName + " " + BooksData[0].userID.lastName+" revoked the request",
        }
        await SendNotification(fcmToken, data, {})
        const reciever = await Users.find({ _id: request.body.userID}, { fcmToken: 1 }).exec();
        console.log(reciever);
        if (reciever[0].fcmToken !=''){
            await SendNotification([reciever[0].fcmToken], { type: "ONLY_NOTIFICATION" }, notification)
        }

    } catch (error) {
        console.log(error)
        response.status(500).json('0');
    }
});
module.exports = router;