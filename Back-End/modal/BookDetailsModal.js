const Mongoose = require('mongoose');
const requestedUser = Mongoose.Schema({
    userID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    status: {
        type: Number,
        default: 0
    },
    sellerConformation: {
        type: Boolean,
        default: false
    },
    deliverd:{
        type: Boolean,
        default: false
    },
    received:{
        type: Boolean,
        default: false
    },
    buyerConformation: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },

});
const Books = Mongoose.model("Books", {
    userID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    title: {
        type: String,
    },
    price: {
        type: String,
    },
    condition: {
        type: String,
    },
    description: {
        type: String,
    },
    coverURL: {
        type: String,
    },
    isDisplay:{
        type:Boolean,
        default:true,
    },
    status:{
        type: Number,
        default: 0
    },
    requests: [requestedUser],
    date: {
        type: Date,
        default: Date.now 
    },
    
});
module.exports = Books;


