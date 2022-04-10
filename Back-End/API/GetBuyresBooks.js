const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
router.post("/GetBuyerBooks", async (request, response) => {
    try {
        let date;
        if (request.body.date == "current") {
            date = new Date();
        } else {
            date = new Date(request.body.date);
        }
        var BooksData = await Books.find({ "requests.userID": request.body.userID, "requests.date": { $lt: date } }).sort({ date: -1 }).populate('userID', { password: 0 }).populate('requests.userID', { password: 0 }).limit(20).exec()
        response.json(BooksData);
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;