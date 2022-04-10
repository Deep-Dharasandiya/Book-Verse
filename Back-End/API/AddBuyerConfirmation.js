const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');
const SendNotification = require('./SendNotification');
router.post("/AddBuyerConfirmation", async (request, response) => {
    try {
        if(request.body.isConfirm){
           // await Books.updateMany({ _id: request.body.bookID, "requests.userID": request.body.userID }, { isDisplay:false,$set: { "requests.$.buyerConformation": true, "requests.$.status": 2,status:2} }).exec();
            const temp=await Books.find({ _id: request.body.bookID },{requests:1}).exec()
            for(i=0;i<temp[0].requests.length;i++){
                if (temp[0].requests[i].userID == request.body.userID){
                    await Books.updateMany({ _id: request.body.bookID, "requests.userID": request.body.userID }, { isDisplay: false, $set: { "requests.$.buyerConformation": true, "requests.$.status": 2, status: 2 } }).exec();
                }else{
                    await Books.updateMany({ _id: request.body.bookID, "requests.userID": temp[0].requests[i].userID  }, {$set: { "requests.$.status": 6} }).exec();
                }
            }
           // await Books.updateMany({ _id: request.body.bookID, "requests.userID": { $ne: request.body.userID } }, { requests:{status:6} }).exec();
        }else{
            await Books.updateMany({ _id: request.body.bookID, "requests.userID": request.body.userID }, { $set: { "requests.$.sellerConformation": false, "requests.$.status":20,status:20 } }).exec();
        }
        const BooksData = await Books.find({ _id: request.body.bookID }).populate('userID', { password: 0 }).populate('requests.userID', { password: 0 }).exec()
        response.json({ isAdd: true, data: BooksData[0] });
        const userData = await Users.find({ _id: { $ne: request.body.userID }, city: BooksData[0].userID.city }, { fcmToken: 1 }).exec();
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
        const sender = await Users.find({ _id: request.body.userID }, { firstName:1,lastName:1 }).exec();
        const reciever = await Users.find({ _id: BooksData[0].userID._id }, { fcmToken: 1 }).exec();
        const notification = {
            title: request.body.isConfirm ?"Deal finalized":"Deal Rejected",
            body: request.body.isConfirm ? sender[0].firstName + " " + sender[0].lastName + " confirm the deal for book " + BooksData[0].title : sender[0].firstName + " " + sender[0].lastName + " rejected deal for book " + BooksData[0].title,
        }
        await SendNotification(fcmToken, data, {})
       
        console.log(reciever);
        if (reciever[0].fcmToken != '') {
            await SendNotification([reciever[0].fcmToken], { type: "ONLY_NOTIFICATION" }, notification)
        }
    } catch (error) {
        console.log(error)
        response.status(500).json('0');
    }
});
module.exports = router;