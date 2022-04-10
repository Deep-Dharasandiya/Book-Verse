const express = require('express');
const router = express.Router()
const Books = require('../modal/BookDetailsModal');
const Users = require('../modal/UserDetailsModal');

router.post("/GetAllBooks", async (request, response) => {
    try {
        let userIDs;
       if(request.body.college !=''){
           userIDs = await Users.find({ city: request.body.city, college: request.body.college },{_id:1}).exec();
       }else{
           userIDs = await Users.find({ city: request.body.city } ,{_id: 1 }).exec();
       }
       let date;
        if (request.body.date =="current"){
            date=new Date();
        }else{
            date = new Date(request.body.date);
        }
        userIDs = userIDs.filter(function (item) {
            return item._id != request.body.userID
        })
        const BooksData = await Books.find({ date: { $lt: date},isDisplay:true, userID: { $in: userIDs } })
            .sort({ date: -1 })
            .limit(20)
            .populate('userID', { password: 0 })
            .populate('requests.userID', { password: 0 })
            .exec()
        response.json(BooksData);
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;
