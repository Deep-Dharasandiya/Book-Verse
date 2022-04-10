const express = require('express');
const router = express.Router()
const Users = require('../modal/UserDetailsModal');

router.post("/UpdateUser", async (request, response) => {
    try {
       await Users.updateOne({ _id: request.body.id }, request.body).exec();
        response.json({ isUpdate: true });
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;