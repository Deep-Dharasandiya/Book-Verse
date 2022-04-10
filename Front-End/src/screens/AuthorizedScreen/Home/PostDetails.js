import React from 'react'
import { ScrollView, StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
//styles
import CommonStyles from '../../CommonStyles';
//utils
import Colors from '../../../constant/Colors';
import { unit,width } from '../../../constant/ScreenDetails';
import RoundedButton from '../../../components/button/RoundedButton';
import { rootContext } from '../../../context/store/ContextStore';
import { addRequest } from '../../../networkServices/AuthenticationServices';
import { updateBookPost } from '../../../context/actions/bookPostActions';
import { addBuyerNewBook } from '../../../context/actions/buyerBookActions';
import { toastOn } from '../../../context/actions/commonActions';
import ConfirmationAleart from '../../../components/confirmationAleart';
export default function PostDetails(props) {
    const [bookDetails,setBookDetails]= React.useState(props.route.params.item);
    const[confirmation,setConfirmation]=React.useState(false);

    const data = React.useContext(rootContext);
    const currentUserID = data.commonReducerState.userDetails._id;
    const temp = data.bookPostReducerState.bookPostData.filter((item) => item._id == props.route.params.item._id)[0]

    if (temp!=bookDetails){
        if (temp) {
            setBookDetails(temp);
        }
    }
    function checkForApplyed() {
        const len = bookDetails.requests.length;
        for (i = 0; i < len; i++) {
            if (bookDetails.requests[i].userID._id== currentUserID) {
                return false;
            }
        }
        return true;
    }
    async function onConnect(){
        const body={
            bookID: bookDetails._id,
            userID: data.commonReducerState.userDetails._id
        }
        const response = await addRequest(body);
        if (response && response.isAdd) {
            addBuyerNewBook(response.data);
             updateBookPost(response.data);
            toastOn("Your request for book successfully sent.")
            props.navigation.navigate("BuyerChatBoard", { item: response.data})
        }
    }
    function handleConfirmation(flag){
        setConfirmation(false);
        if(flag){
            onConnect();
        }
    }
    return (
    <View style={CommonStyles.containerBlurPurple}>
        <View style={styles.appBar}>
                <TouchableOpacity
                    onPress={() => props.navigation.pop()}
                >
                    <Image
                        style={{...CommonStyles.icon1Style,marginHorizontal:15* unit}}
                        resizeMode="contain"
                        source={require('../../../assets/back/back.png')}
                    />
                </TouchableOpacity>
            <Text style={CommonStyles.font4White}>Book Details</Text>
        </View>
     
        <ScrollView>
            <Image
                source={{ uri: bookDetails.coverURL  }}
                    style={{...CommonStyles.imageView4,marginTop:15* unit}}
            />
            <View style={{marginLeft:15 * unit,marginTop:15*unit}}>
                <Text style={CommonStyles.font4Purple}>{bookDetails.title}</Text>
                <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>{"Book's Condition: "+bookDetails.condition}</Text>
                <Text style={CommonStyles.font4Purple}>{"₹ "+bookDetails.price}</Text>
                <Text style={{...CommonStyles.font2Black,fontWeight:'500',marginTop:10* unit}}>About Book:</Text>
                <View style={{...CommonStyles.textView,marginTop:10* unit}}>
                    <Text style={{ ...styles.normalText,fontSize:15*unit, fontWeight: '300' }}>
                        {bookDetails.description}
                    </Text>
                </View>
                <View style={{height:0.5*unit,width:width*0.90,backgroundColor:Colors.black,marginVertical:15 * unit}}/>
                <Text style={{ ...CommonStyles.font2Black, fontWeight: '500'}}>Posted By:</Text>
                <View style={styles.profileView}>
                    <View style={{marginLeft:10 * unit}}>
                        <Text style={CommonStyles.font3Purple}>{bookDetails.userID.firstName + " " + bookDetails.userID.lastName}</Text>
                        <Text style={{ ...CommonStyles.font1Black, fontWeight: '300' }}>{bookDetails.userID.college}</Text>
                        <Text style={{ ...CommonStyles.font1Black, fontWeight: '300' }}>{bookDetails.userID.city}</Text>
                    </View>
                    <Image
                        source={{ uri: bookDetails.userID.profileURL }}
                        style={{...CommonStyles.imageView1,marginRight:15* unit}}
                    />
                </View>
                <Text style={{ ...CommonStyles.font2Black, fontWeight: '500', marginTop: 10 * unit }}>Email:</Text>
                <View style={{...CommonStyles.textView,marginTop:0}}>
                    <Text style={{ ...CommonStyles.font1Black, fontWeight: '300' }}>{bookDetails.userID.email}</Text>
                </View>
            </View>
        </ScrollView>
        <ConfirmationAleart
          isVisible={confirmation}
          lable={'Are you sure?'}
          onPress={handleConfirmation}
        />
        <RoundedButton
            lable={"Connect with Seller"}
            onClick={()=>setConfirmation(true)}
            dark={true}
            Style={{marginBottom:15* unit}}
            isEnable={checkForApplyed()}
        />
           
    </View>
    )
}

const styles = StyleSheet.create({
    appBar: {
        paddingVertical: 15 * unit,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:Colors.purple
    },
    profileView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

})