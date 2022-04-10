const Mongoose = require('mongoose');
const History = Mongoose.model("history", {
    sellerID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    buyerID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    title: {
        type: String,
    },
    price:{
        type: String,
    },
    condition:{
        type: String,
    },
    description:{
        type: String,
    },
    coverURL: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = History;