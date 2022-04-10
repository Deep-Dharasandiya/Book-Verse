const express = require('express');
const router = express.Router()
const Mongoose = require('mongoose');
const Users = require('../modal/UserDetailsModal');

router.post("/ContactNumberCheck", async (request, response) => {
    try {
        var check = await Users.find({ contactNumber: request.body.contactNumber }, { _id: 1 }).exec()
        let flag=false;
        if (check.length != 0) {
           flag=true;
        } 
        response.json({isRegister:flag});
    } catch (error) {
        response.status(500).json(0);
    }
});
module.exports = router;