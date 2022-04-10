const express = require('express');
const router = express.Router()
const Users = require('../modal/UserDetailsModal');

router.post("/Login", async (request, response) => {
    try {
        var userData = await Users.find({ contactNumber: request.body.contactNumber, password:request.body.password },{password:0}).limit(1).exec()
        if(userData.length ==1){
            await Users.updateOne({ contactNumber: request.body.contactNumber }, { fcmToken: request.body.fcmToken }).exec();
            response.json({
                isLogin:true,
                data: userData[0]
            });
        }else{
            response.json({isLogin:false});
        }
    } catch (error) {
        response.status(500).json('0');
    }
});
module.exports = router;