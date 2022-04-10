const Mongoose = require('mongoose');
const Ussers = Mongoose.model("Users", {
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    city: {
        type: String,
    },
    college: {
        type: String,
    },
    password: {
        type: String,
    },
    profileURL: {
        type: String,
    },
    fcmToken:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now 
    },
});
module.exports = Ussers;