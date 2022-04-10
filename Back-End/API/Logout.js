const express = require('express');
const router = express.Router()
const Users = require('../modal/UserDetailsModal');

router.post("/Logout", async (request, response) => {
    try {
        await Users.updateOne({ _id: request.body.id }, {fcmToken:''}).exec();
        response.json({ isLogout: true });
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;