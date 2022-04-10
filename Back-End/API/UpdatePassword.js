const express = require('express');
const router = express.Router()
const Users = require('../modal/UserDetailsModal');

router.post("/UpdatePassword", async (request, response) => {
    try {
        await Users.updateOne({ contactNumber: request.body.contactNumber }, {password:request.body.password}).exec();
        response.json({ isUpdate: true });
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;