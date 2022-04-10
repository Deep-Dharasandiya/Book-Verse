const express = require('express');
const router = express.Router()
const Mongoose = require('mongoose');
const Users = require('../modal/UserDetailsModal');

router.post("/InsertUserDetails", async (request, response) => {
    try {
        var data = new Users(request.body);
        await data.save();
        response.json({isRegister:true});
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;