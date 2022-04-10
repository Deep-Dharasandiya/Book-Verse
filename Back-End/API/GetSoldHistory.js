const express = require('express');
const router = express.Router()
const History = require('../modal/HistoryModal');

router.post("/GetSoldBook", async (request, response) => {
    try {
        var BooksData = await History.find({ sellerID: request.body.userID }).sort({ date: -1 }).populate('sellerID', { password: 0 }).populate('buyerID', { password: 0 }).exec()
        response.json(BooksData);
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;