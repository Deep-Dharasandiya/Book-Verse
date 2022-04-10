const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const MongoUrl =
//'mongodb+srv://bookverse:bookverse@cluster0.pnwug.mongodb.net/bookverse?retryWrites=true&w=majority';
const MongoUrl ='MongoDB url';
 
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(require('./API/InsertUserDetails'));
app.use(require('./API/ContactNumberCheck'));
app.use(require('./API/InsertBookDetails'));
app.use(require('./API/GetUserBooks'));
app.use(require('./API/GetAllBooks'));
app.use(require('./API/DeleteBook'));
app.use(require('./API/UpdateBook'));
app.use(require('./API/UpdateUser'));
app.use(require('./API/UpdatePassword'));
app.use(require('./API/Login'));
app.use(require('./API/Logout'));
app.use(require('./API/AddRequestOfBook'));
app.use(require('./API/DeleteRequestOfBook'));
app.use(require('./API/AddSellerConfirmation'));
app.use(require('./API/AddBuyerConfirmation'));
app.use(require('./API/AddDeliveredFlag'));
app.use(require('./API/AddReceivedFlag'));
app.use(require('./API/GetBuyresBooks'));
app.use(require('./API/InsertChat'));
app.use(require('./API/GetChats'));
app.use(require('./API/GetSoldHistory'));
app.use(require('./API/GetPurchaseHistory'));

mongoose.connect(MongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true
});
mongoose.connection.on('connected', () => {
  console.log('connected to mongo yeahhh');
});
mongoose.connection.on('error', err => {
  console.log('Error', err);
});
app.get('/', (req, res) => {
  res.send('hi!');
});
app.listen(port, () => {
  console.log('server is running on port' + port);
});
