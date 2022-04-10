import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator, TextInput} from 'react-native'
//style
import CommonStyles from '../../../CommonStyles'
//utils
import Colors from '../../../../constant/Colors'
import { unit,width } from '../../../../constant/ScreenDetails'
import { updateBookPost } from '../../../../context/actions/bookPostActions'
import { addNewUserBook, deleteUserBook } from '../../../../context/actions/userBookAction'
import { addDeliveredFlag, addSellerConfirmation, GetChat, InsertChat } from '../../../../networkServices/AuthenticationServices'
import { rootContext } from '../../../../context/store/ContextStore'
import ConfirmationAleart from '../../../../components/confirmationAleart';
import { addChat, addNewChat } from '../../../../context/actions/chatActions'

export default function SellerChatBoard(props) {
    const [message,setMessage]=React.useState('');
    const [bookDetails, setBookDetails] = React.useState(props.route.params.bookDetails);
    const [request, setRequest] = React.useState(props.route.params.item)
    const [confirmationDealTrue, setConfirmationDealTrue] = React.useState(false);
    const [confirmationDealFalse, setConfirmationDealFalse] = React.useState(false);
    const [confirmationRecieved, setConfirmationRecieved] = React.useState(false);
    const [isNextSearch, setIsNextSearch] = React.useState(true);
    const [insertLoading, setInsertLoading] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const data = React.useContext(rootContext);
    const currentUserID = data.commonReducerState.userDetails._id;
    const temp = data.buyerBookReducerState.buyerBookData.filter((item) => item._id == props.route.params.item._id)[0]

    if (temp != bookDetails) {
        if (temp) {
            setBookDetails(temp);
            setRequest(temp.requests.filter((item) => item._id == props.route.params.item._id))
        }
    }
    React.useEffect(() => {
        if (data.chatReducerState.chatData.filter((item) => item.bookID == bookDetails._id && (item.senderID == currentUserID || item.senderID == request.userID._id) && (item.receiverID == currentUserID || item.receiverID == request.userID._id)).length==0) {
            fetchChatsData(true);
        }
    }, []);

    function onChangeMessage(text){
        setMessage(text);
    }
    async function fetchChatsData(initial) {
        setIsLoading(true);
        let date;
        const chatdata = data.chatReducerState.chatData.filter((item) => item.bookID == bookDetails._id && (item.senderID == currentUserID || item.senderID == request.userID._id) && (item.receiverID == currentUserID || item.receiverID == request.userID._id));
        if (chatdata.length != 0 && !initial) {
            date = chatdata[chatdata.length - 1].date;
        } else {
            date = "current";
        }
        const body = {
            userID1: currentUserID,
            userID2: request.userID._id,
            bookID: bookDetails._id,
            date: date,
        }
        const response = await GetChat(body);
        if (response) {
            if (response.length != 0 && response.length % 20 == 0) {
                setIsNextSearch(true);
            } else {
                setIsNextSearch(false)
            }
            if (initial) {
            }
            addChat(response);
        }
        setIsLoading(false);
    }
    function onEndScroll() {
        if (isNextSearch) {
            fetchChatsData(false);
        }
    }
    async function chatSend() {
        if (message != '') {
            setInsertLoading(true);
            const body = {
                bookID: bookDetails._id,
                senderID: currentUserID,
                receiverID: request.userID._id,
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
   async function onConfirmation(flag){
       const body = {
           bookID: bookDetails._id,
           userID: request.userID._id,
           isConfirm:flag,
       }
       const response=await addSellerConfirmation(body);
       if (response && response.isAdd){
           deleteUserBook(response.data._id);
           addNewUserBook(response.data);
           updateBookPost(response.data);
           props.navigation.pop();
           props.navigation.pop();
       }

    }
    async function onDeliverd() {
        const body = {
            bookID: bookDetails._id,
            userID: request.userID._id
        }
        const response = await addDeliveredFlag(body);
        if (response && response.isAdd) {
            deleteUserBook(response.data._id);
            addNewUserBook(response.data);
            updateBookPost(response.data);
            props.navigation.pop();
            props.navigation.pop();
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
    function handleConfirmationReceived(flag) {
        setConfirmationRecieved(false);
        if (flag) {
            onDeliverd(true);
        }
    }
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
                <View style={{...styles.appBarBody,paddingVertical:10* unit}}>
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
                            source={{ uri: request.userID.profileURL }}
                        />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                        <Text style={CommonStyles.font2White}>{request.userID.firstName + " " + request.userID.lastName}</Text>
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
                    isVisible={confirmationRecieved}
                    lable={'Are you sure?'}
                    onPress={handleConfirmationReceived}
                />
                {
                    (request.status == 0 || request.status == 20) &&(
                        <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white, paddingVertical: 10 * unit, backgroundColor: '#591C6E' }}>
                            <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                                <Text style={CommonStyles.font1White}>Sell book to the user?</Text>
                            </View>
                            <TouchableOpacity style={styles.btn}
                              onPress={() => setConfirmationDealTrue(true)}
                            >
                                <Text style={CommonStyles.font2White}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                {
                    request.status == 1 && (
                        <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white, paddingVertical: 10 * unit, backgroundColor: '#591C6E' }}>
                            <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                                <Text style={CommonStyles.font1White}>Revoke the confirmation?</Text>
                            </View>
                            <TouchableOpacity style={styles.btn}
                                onPress={() => setConfirmationDealFalse(true)}
                            >
                                <Text style={CommonStyles.font2White}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                {
                    (request.status == 2 || request.status == 40) &&(
                        <View style={{ ...styles.appBarBody, marginTop: 5 * unit, borderTopWidth: 1, borderColor: Colors.white,paddingVertical:10* unit,backgroundColor:'#591C6E'}}>
                            <View style={{ flex: 1, marginHorizontal: 10 * unit }}>
                                <Text style={CommonStyles.font1White}>Delivered book? </Text>
                            </View>
                            <TouchableOpacity style={styles.btn}
                               onPress={() => setConfirmationRecieved(true)}
                            >
                                <Text style={CommonStyles.font2White}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            

            </View>
            <FlatList
                inverted
                key={1}
                data={data.chatReducerState.chatData.filter((item) => item.bookID == bookDetails._id && (item.senderID == currentUserID || item.senderID == request.userID._id) && (item.receiverID == currentUserID || item.receiverID == request.userID._id))}
                listMode="SCROLLVIEW"
                onEndReached={() => onEndScroll()}
                keyExtractor={(item, index) => `key-${index}`}
                extraData={previousChatDate = '', currentChatDate = ''}
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
                    if(index==0){
                        previousChatDate = currentChatDate;
                    }
                   
                    return <View>
                        {
                            index == data.chatReducerState.chatData.filter((item) => item.bookID == bookDetails._id && (item.senderID == currentUserID || item.senderID == request.userID._id) && (item.receiverID == currentUserID || item.receiverID == request.userID._id)).length - 1 && (
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
                            item.senderID == currentUserID ?
                                <View style={styles.messageContainer}>
                                    <View style={styles.messageBody}>
                                        <Text style={CommonStyles.font1White}>{item.message}</Text>
                                        <Text style={{ ...CommonStyles.font1White, fontSize: 11 * unit, position: 'absolute', bottom: 7 * unit, right: 7 * unit, marginTop: 5 * unit }}>{new Date(item.date).getHours() + ":" + new Date(item.date).getMinutes()}</Text>
                                    </View>
                                </View>
                                :
                                <View style={{ ...styles.messageContainer, alignSelf: 'flex-start' }}>
                                    <View style={{ ...styles.messageBody, backgroundColor: Colors.blurPurple, alignSelf: 'flex-start' }}>
                                        <Text style={CommonStyles.font1Black}>{item.message}</Text>
                                        <Text style={{ ...CommonStyles.font1Black, fontSize: 11 * unit, position: 'absolute', bottom: 7 * unit, right: 7 * unit, marginTop: 5 * unit }}>{new Date(item.date).getHours() + ":" + new Date(item.date).getMinutes()}</Text>

                                    </View>
                                </View>
                        }
                        {
                            (index != 0 && previousChatDate != (new Date(item.date).getFullYear() + "-" + (new Date(item.date).getMonth() + 1) + "-" + new Date(item.date).getDate())) && (
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
                            <ActivityIndicator />
                        </View>
                        :
                        <TouchableOpacity style={styles.sentButton}
                            onPress={() => chatSend()}
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
    appBarBody: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        padding: 5 * unit,
        minWidth: 60 * unit,
        backgroundColor: Colors.green,
        ...CommonStyles.centerAlignMent,
        borderRadius: 10 * unit,
        marginHorizontal: 10 * unit,
    },
    messageContainer: {
        width: width * 0.8,
        alignSelf: 'flex-end',
        marginHorizontal: 10 * unit
    },
    messageBody: {
        alignSelf: 'flex-end',
        padding: 10 * unit,
        paddingRight: 40 * unit,
        borderRadius: 10 * unit,
        backgroundColor: Colors.purple,
        marginVertical: 5 * unit,
        borderWidth: 1,
        borderColor: Colors.purple
    },
    dateView: {
        padding: 5 * unit,
        backgroundColor: Colors.purple,
        width: 100 * unit,
        borderRadius: 10 * unit,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10 * unit,
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
