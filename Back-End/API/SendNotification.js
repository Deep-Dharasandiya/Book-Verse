var admin = require('firebase-admin');
var serviceAccount = require('../bookverse-c900b-firebase-adminsdk-z8po4-abd13f0746');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
   // databaseURL: 'https://databaseName.firebaseio.com',
});
async function SendNotification(tokens,data,notification){
  if(tokens.length!=0){
    await admin.messaging().sendMulticast({
      tokens: tokens,
      data: { data: JSON.stringify(data) },
      notification: notification,
      contentAvailable: true,
      priority: 'high',
    });
  }
 
}
module.exports = SendNotification;