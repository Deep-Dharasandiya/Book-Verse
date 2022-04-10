const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');
const SendNotification = require('./SendNotification');
router.post("/DeleteBook", async (request, response) => {
    try {
        const BooksData = await Books.find({ _id: request.body.bookID}).populate('userID', { password: 0 }).exec()
        await Books.deleteOne({ _id: request.body.bookID }).exec();
        response.json({ isDelete: true});
        if (BooksData.length != 0) {
            const userData = await Users.find({ _id: { $ne: BooksData[0].userID._id }, city: BooksData[0].userID.city }, { fcmToken: 1 }).exec();
            let fcmToken = [];
            for (i = 0; i < userData.length; i++) {
                if (userData[i].fcmToken != '') {
                    fcmToken.push(userData[i].fcmToken);
                }
            }
            const data = {
                type: 'Delete_Book',
                deleteBook: BooksData[0]._id
            }
            const notification = {
                // title: "Add New Bok",
                //body: BooksData[0].title,
            }
            await SendNotification(fcmToken, data, notification)
        }
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;