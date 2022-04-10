import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ActivityIndicator } from 'react-native'
//styles
import CommonStyles from '../../../CommonStyles'
//utils
import Colors from '../../../../constant/Colors'
import { unit,width } from '../../../../constant/ScreenDetails'
import { rootContext } from '../../../../context/store/ContextStore'
import { addBuyerConfirmation, addReceivedFlag, GetChat, InsertChat } from '../../../../networkServices/AuthenticationServices'
import { addBuyerNewBook, deleteBuyerBook } from '../../../../context/actions/buyerBookActions'
import { deleteBookPost, updateBookPost } from '../../../../context/actions/bookPostActions'
import ConfirmationAleart from '../../../../components/confirmationAleart';
import { addChat, addNewChat, deleteBookChat} from '../../../../context/actions/chatActions'

export default function BuyerChatBoard(props){
    const currentUserID = React.useContext(rootContext).commonReducerState.userDetails._id;
    const [message, setMessage] = React.useState('');
    const [bookDetails, setBookDetails] = React.useState(props.route.params.item);
    const data = React.useContext(rootContext);
    const temp = data.buyerBookReducerState.buyerBookData.filter((item) => item._id == props.route.params.item._id)[0]
    const [isLoading, setIsLoading] = React.useState(false);
    const [confirmationDealTrue, setConfirmationDealTrue] = React.useState(false);
    const [confirmationDealFalse, setConfirmationDealFalse] = React.useState(false);
    const [confirmationRecievedTrue, setConfirmationRecievedTrue] = React.useState(false);
    const [confirmationRecievedFalse, setConfirmationRecievedFalse] = React.useState(false);
    const [isNextSearch,setIsNextSearch]= React.useState(true);
    const [insertLoading,setInsertLoading]=React.useState(false);

    if (temp != bookDetails) {
        if (temp) {
            setBookDetails(temp);
        }
    }
    React.useEffect(() => {
        if (data.chatReducerState.chatData.filter((item) => item.bookID == bookDetails._id && (item.senderID == currentUserID || item.senderID == bookDetails.userID._id) && (item.receiverID == currentUserID || item.receiverID == bookDetails.userID._id)).length == 0) {
            fetchChatsData(true);
        }
    }, []);
    function onChangeMessage(text) {
        setMessage(text);
    }
    async function fetchChatsData(initial) {
        setIsLoading(true);
        let date;
        const chatdata = data.chatReducerState.chatData.filter((item) => item.bookID == bookDetails._id && (item.senderID == currentUserID || item.senderID == bookDetails.userID._id) && (item.receiverID == currentUserID || item.receiverID == bookDetails.userID._id));
        if (chatdata.length != 0 && !initial) {
            date = chatdata[chatdata.length - 1].date;
        } else {
            date = "current";
        }
        
        const body = {
            userID1: currentUserID,
            userID2: bookDetails.userID._id,
            bookID: bookDetails._id,
            date: date,
        }
        const response = await GetChat(body);
        if (response) {
            if(response.length !=0 && response.length%20==0){
                setIsNextSearch(true);
            }else{
                setIsNextSearch(false)
            }
            if (initial) {
            }
            addChat(response);
        }
        setIsLoading(false);
    }
    function onEndScroll() {
        if(isNextSearch){
            fetchChatsData(false);
        }
    }
    async function insertChat(){
        if(message !=''){
            setInsertLoading(true);
            const body = {
                bookID: bookDetails._id,
                senderID: currentUserID,
                receiverID: bookDetails.userID._id,
                message: message
            }
            const response = await InsertChat(body);
            if (response && response.isAdd) {
                addNewChat(response.data);
                setMessage('');
                setInsertLoading(false);
            }
        }
    }
    async function onConfirmation(flag) {
        const body = {
            bookID: bookDetails._id,
            userID: currentUserID,
            isConfirm: flag
        }
        const response = await addBuyerConfirmation(body);
        if (response && response.isAdd) {
            deleteBuyerBook(response.data._id)
            addBuyerNewBook(response.data);
            updateBookPost(response.data);
        }
    }
    async function onReceived(flag) {
        const body = {
            bookID: bookDetails._id,
            userID: currentUserID,
            isConfirm: flag
        }
        const response = await addReceivedFlag(body);
        if (response && response.isAdd) {
            if (response.isSold){
                deleteBuyerBook(response.data._id);
                deleteBookPost(response.data._id);
                deleteBookChat(response.data._id);
                props.navigation.replace("PurchaseHistory");
            }else{
                deleteBuyerBook(response.data._id);
                updateBookPost(response.data);
                addBuyerNewBook(response.data);
            }
        }
    }
    function handleConfirmationDealTrue(flag) {
        setConfirmationDealTrue(false);
        if (flag) {
            onConfirmation(true);
        }
    }
    function handleConfirmationDealFalse(flag) {
        setConfirmationDealFalse(false);
        if (flag) {
            onConfirmation(false);
        }
    }
    function handleConfirmationReceivedTrue(flag) {
        setConfirmationRecievedTrue(false);
        if (flag) {
            onReceived(true);
        }
    }
    function handleConfirmationReceivedFalse(flag) {
        setConfirmationRecievedFalse(false);
        if (flag) {
            onReceived(false);
        }
    }
  return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
              <View style={{ ...styles.appBarBody, paddingVertical: 10 * unit }}>
                  <View style={styles.appBarBody}>
                      <TouchableOpacity
                          style={{ marginHorizontal: 15 * unit }}
                          onPress={() => props.navigation.pop()}
                      >
                          <Image
                              style={CommonStyles.icon1Style}
                              resizeMode="contain"
                              source={require('../../../../assets/back/back.png')}
                          />
                      </TouchableOpacity>
                      <Image
                          style={{ ...CommonStyles.imageView0 }}
                          source={{ uri: bookDetails.userID.profileURL }}
                      />
                    </View>
                    <View style={{flex:1,marginHorizontal:10* unit}}>
                      <Text style={CommonStyles.font2White}>{bookDetails.userID.firstName + " " + bookDetails.userID.lastName}</Text>
                      <Text style={CommonStyles.font1White}>{bookDetails.title}</Text>
                    </View>
                </View>
              <ConfirmationAleart
                  isVisible={confirmationDealTrue}
                  lable={'Are you sure?'}
                  onPress={handleConfirmationDealTrue}
              />
              <ConfirmationAleart
                  isVisible={confirmationDealFalse}
                  lable={'Are you sure?'}
                  onPress={handleConfirmationDealFalse}
              />
              <ConfirmationAleart
                  isVisible={confirmationRecievedTrue}
                  lable={'Are you sure?'}
                  onPress={handleConfirmationReceivedTrue}
              />
              <ConfirmationAleart
                  isVisible={confirmationRecievedFalse}
                  lable={'Are you sure?'}
                  onPress={handleConfirmationReceivedFalse}
              />
                {
                  bookDetails.requests.filter((item) => item.userID._id == currentUserID)[0].status == 1 &&(
                      <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white, paddingVertical: 10 * unit, backgroundColor: '#591C6E' }}>
                          <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                              <Text style={CommonStyles.font1White}>Seller wants to sell book this to you!</Text>
                          </View>
                          <TouchableOpacity style={styles.btn}
                              onPress={() => setConfirmationDealTrue(true)}
                          >
                              <Text style={CommonStyles.font2White}>Yes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ ...styles.btn, backgroundColor: Colors.red }}
                              onPress={() => setConfirmationDealFalse(true)}
                          >
                              <Text style={CommonStyles.font2White}>No</Text>
                          </TouchableOpacity>
                    </View>
                  )
                }
                {
                  bookDetails.requests.filter((item) => item.userID._id == currentUserID)[0].status == 3 &&(
                      <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white, paddingVertical: 10 * unit, backgroundColor: '#591C6E' }}>
                          <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                              <Text style={CommonStyles.font1White}>Received the book?</Text>
                          </View>
                          <TouchableOpacity style={styles.btn}
                              onPress={() => setConfirmationRecievedTrue(true)}
                          >
                              <Text style={CommonStyles.font2White}>Yes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ ...styles.btn, backgroundColor: Colors.red }}
                              onPress={() => setConfirmationRecievedFalse(true)}
                            >
                              <Text style={CommonStyles.font2White}>No</Text>
                          </TouchableOpacity>
                      </View>
                  )
                }
                
            </View>
          <FlatList
              inverted
              key={1}
              data={data.chatReducerState.chatData.filter((item) => item.bookID == bookDetails._id && (item.senderID == currentUserID || item.senderID == bookDetails.userID._id) && (item.receiverID == currentUserID || item.receiverID == bookDetails.userID._id))}
              listMode="SCROLLVIEW"
              extraData={previousChatDate='',currentChatDate=''}
              onEndReached={() => onEndScroll()}
              keyExtractor={(item, index) => `key-${index}`}
              ListFooterComponent={
                  <View>
                      {
                          isLoading && (<ActivityIndicator />)
                      }
                  </View>
              }

              renderItem={({ item, index }) => {
                  previousChatDate = currentChatDate;
                  currentChatDate = new Date(item.date).getFullYear() + "-" + (new Date(item.date).getMonth() + 1) + "-" + new Date(item.date).getDate()
                  if (index == 0) {
                      previousChatDate = currentChatDate;
                  }
                  return <View>
                      {
                          index !=0 && index == data.chatReducerState.chatData.filter((item) => item.bookID == bookDetails._id && (item.senderID == currentUserID || item.senderID == bookDetails.userID._id) && (item.receiverID == currentUserID || item.receiverID == bookDetails.userID._id)).length-1 && (
                              <View style={styles.dateView}>
                                  {
                                      previousChatDate == new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() ?
                                          <Text style={{ ...CommonStyles.font1White }}>{"Today"}</Text>
                                          :
                                          <Text style={{ ...CommonStyles.font1White }}>{previousChatDate}</Text>
                                  }
                              </View>
                          )
                      }
                      {   
                          item.senderID==currentUserID?
                              <View style={styles.messageContainer}>
                                  <View style={styles.messageBody}>
                                      <Text style={CommonStyles.font1White}>{item.message }</Text>
                                      <Text style={{ ...CommonStyles.font1White, fontSize: 11 * unit, position: 'absolute', bottom: 7 * unit, right: 7 * unit, marginTop: 5 * unit }}>{new Date(item.date).getHours() + ":" + new Date(item.date).getMinutes()}</Text>
                                  </View>
                              </View>
                              :
                              <View style={{ ...styles.messageContainer, alignSelf: 'flex-start' }}>
                                  <View style={{ ...styles.messageBody, backgroundColor: Colors.blurPurple, alignSelf: 'flex-start' }}>
                                      <Text style={CommonStyles.font1Black}>{item.message }</Text>
                                      <Text style={{...CommonStyles.font1Black,fontSize:11* unit,position:'absolute',bottom:7* unit,right:7* unit,marginTop:5* unit}}>{new Date(item.date).getHours() + ":" + new Date(item.date).getMinutes()}</Text>

                                  </View>
                            
                              </View>
                      }
                     
                     {
                          (index != 0 && previousChatDate != (new Date(item.date).getFullYear() + "-" + (new Date(item.date).getMonth() + 1) + "-" + new Date(item.date).getDate()))  &&(
                              <View style={styles.dateView}>
                                  {
                                      previousChatDate==new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() ?
                                        <Text style={{...CommonStyles.font1White}}>{"Today"}</Text>
                                        :
                                          <Text style={{ ...CommonStyles.font1White }}>{previousChatDate}</Text>   
                                  }
                              </View>
                         )
                     }
                  </View>
              }}
          />
          <View style={styles.bottomView}>
              <View style={styles.textInputView}>
                  {/* <Image
                      style={{ ...CommonStyles.icon1Style, marginHorizontal: 10 * unit }}
                      resizeMode="contain"
                      source={require('../../../../assets/chatPurple/chat.png')}
                  /> */}
                  <TextInput
                      style={styles.textInput}
                      placeholder='Message'
                      placeholderTextColor={Colors.gray}
                      multiline={true}
                      onChangeText={(text) => onChangeMessage(text)}
                      defaultValue={message}
                  />
              </View>
              {
                  insertLoading ?
                      <View style={styles.sentButton} >
                          <ActivityIndicator/>
                      </View>
                    :
                      <TouchableOpacity style={styles.sentButton}
                          onPress={() => insertChat()}
                      >
                          <Image
                              style={CommonStyles.icon1Style}
                              resizeMode="contain"
                              source={require('../../../../assets/send/send.png')}
                          />
                      </TouchableOpacity>

              }
          </View>
        </View>
    )
}
const styles = StyleSheet.create({
    appBar: {
        backgroundColor: Colors.purple
    },
    appBarBody:{
        alignSelf:'flex-start',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    btn:{
        padding:5* unit,
       minWidth:60*unit,
        backgroundColor:Colors.green,
        ...CommonStyles.centerAlignMent,
        borderRadius:10* unit,
        marginHorizontal:10* unit,
    },
    messageContainer:{
        width: width * 0.8, 
        alignSelf: 'flex-end', 
        marginHorizontal: 10 * unit 
    },
    messageBody:{
        alignSelf: 'flex-end',
        padding: 10 * unit, 
        paddingRight:40* unit,
        borderRadius: 10 * unit, 
        backgroundColor: Colors.purple, 
        marginVertical: 5 * unit,
        borderWidth:1,
        borderColor:Colors.purple
    },
    dateView:{
        padding: 5 * unit, 
        backgroundColor: Colors.purple, 
        width: 100 * unit, 
        borderRadius: 10 * unit, 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center' ,
        marginVertical:10* unit,
    },
    bottomView: {
        marginVertical: 10 * unit,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    textInput: {
        flex: 1,
        color: Colors.black,
        fontSize: 18 * unit,
        paddingHorizontal: 20 * unit,
        paddingVertical: 8 * unit,
    },
    textInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxHeight: 150 * unit,
        width: width * 0.80,
        borderRadius: 25 * unit,
        borderWidth: 1 * unit,
        borderColor: Colors.purple,
        marginLeft: (width * 0.08) / 3
    },
    sentButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: width * 0.06,
        backgroundColor: Colors.purple,
        marginHorizontal: (width * 0.08) / 3
    }
})