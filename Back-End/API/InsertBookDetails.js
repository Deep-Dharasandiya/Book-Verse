const express = require('express');
const router = express.Router()
const Mongoose = require('mongoose');
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');
const SendNotification = require('./SendNotification');
router.post("/InsertBookDetails", async (request, response) => {
    try {
        var res = new Books(request.body);
        var result = await res.save();
        const BooksData = await Books.find({ _id: result._id}).populate('userID', { password: 0 }).exec()
        response.json({ isUpload: true, data: BooksData[0] });
        const userData = await Users.find({ _id:{$ne:  BooksData[0].userID._id}, city: BooksData[0].userID.city }, { fcmToken:1}).exec();
        let fcmToken=[];
        for (i = 0; i < userData.length;i++){
            if (userData[i].fcmToken != '') {
                fcmToken.push(userData[i].fcmToken);
            }
        }
        const data={
            type: 'ADD_New_Book',
            newBook: BooksData[0]
        }
        const notification={
           // title: "Add New Bok",
            //body: BooksData[0].title,
        }
       await SendNotification(fcmToken,data,notification)
    } catch (error) {
        response.status(500).json('0');
        console.log(error);
    }
});
module.exports = router;