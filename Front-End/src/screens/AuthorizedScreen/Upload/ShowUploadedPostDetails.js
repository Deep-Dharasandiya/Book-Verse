import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image,ActivityIndicator } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
//styles
import CommonStyles from '../../CommonStyles';
//utils
import Colors from '../../../constant/Colors';
import { unit, width } from '../../../constant/ScreenDetails';
import TextFeild from '../../../components/input/textFeild';
import MediaSelection from '../../../components/input/MediaSelection'
import DropDawnList from '../../../components/input/DropDawnList';
import { rootContext } from '../../../context/store/ContextStore';
import { deleteUserBook, updateUserBook } from '../../../context/actions/userBookAction';
import { deleteBook, updateUploadedBook } from '../../../networkServices/AuthenticationServices';
import { aleartOn, toastOn } from '../../../context/actions/commonActions';
import RoundedButton from '../../../components/button/RoundedButton';
import ConfirmationAleart from '../../../components/confirmationAleart';

export default function ShowUploadedPostDetails(props) {
    const oldURL = props.route.params.item.coverURL;
    const [coverURL, setCoverURL] = React.useState(props.route.params.item.coverURL)
    const [mediaFlag, setMediaFlag] = React.useState(false);
    const [title, setTitle] = React.useState(props.route.params.item.title);
    const [condition, setCondition] = React.useState(props.route.params.item.condition);
    const [price, setPrice] = React.useState(props.route.params.item.price);
    const [description, setDescription] = React.useState(props.route.params.item.description);
    const [isEdit,setIsEdit]=React.useState(false);
    const [firebaseUri, setFirebaseUri] = React.useState(oldURL);
    const [imageLoader, setImageLoader] = React.useState(false);
    const [confirmation, setConfirmation] = React.useState(false);
    
    const data = React.useContext(rootContext);
    let conditionData = [{
        value: 'Poor',
    }, {
        value: 'Good',
    }, {
        value: 'Very Good',
    }];
    let mediaData = [{
        value: 'Camera',
    }, {
        value: 'Gallery',
    }];
    function onChangeTitle(text) {
        setTitle(text);
    }
    function onChangeDescription(text) {
        setDescription(text);
    }
    function onChangePrice(text) {
        setPrice(text);
    }
    function onChangeCondition(value) {
        setCondition(value);
    }
    function onChangeMedia(text) {
        if (text == 'Camera') {
            onChangeCameraImage();
        } else {
            onChangeGelleryImage();
        }
    }
    function handleMediaFlag(flag) {
        setMediaFlag(flag);
    }
    async function uploadImage(uri) {
        setImageLoader(true);
        const uniqKey = Math.random().toString().replace('.', '');
        const reference = storage().ref(`Book Picture/${data.commonReducerState.userDetails._id}${uniqKey}Book.png`);
        await reference.putFile(uri);
        setFirebaseUri(await storage().ref(`Book Picture/${data.commonReducerState.userDetails._id}${uniqKey}Book.png`).getDownloadURL())
        setImageLoader(false);
    }
    const options = {
        storageOptions: {
            path: 'images',
            mediaType: 'photo',
        },
        includeBase64: false,
    };

    function onChangeCameraImage() {
        launchCamera(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                if (response.hasOwnProperty('assets')) {
                    setCoverURL(response.assets[0]['uri']);
                    uploadImage(response.assets[0]['uri']);
                }
            }
        });
    }
    function onChangeGelleryImage() {
        launchImageLibrary(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                if (response.hasOwnProperty('assets')) {
                    setCoverURL(response.assets[0]['uri']);
                    uploadImage(response.assets[0]['uri']);
                }

            }
        });

    }
    async function onRemove(){
        const body = {
            bookID: props.route.params.item._id
        }
       const response = await deleteBook(body);
        if(response){
            if (response.isDelete){
                deleteUserBook(props.route.params.item._id);
                props.navigation.pop();
                
            }
        }
    }
    function handleConfirmation(flag) {
        setConfirmation(false);
        if (flag) {
            onRemove();
        }
    }
    function onDescard(){
        setCoverURL(oldURL);
        setTitle(props.route.params.item.title);
        setDescription(props.route.params.item.description);
        setCondition(props.route.params.item.condition);
        setPrice(props.route.params.item.price);
        setFirebaseUri(oldURL);
        setIsEdit(false)
    }
    async function onSave() {
        if (!imageLoader) {
            if (title != '' && condition != '' && price != '' && description != '') {
                if (firebaseUri != '') {
                    const body={
                        id: props.route.params.item._id,
                        userID: props.route.params.item.userID,
                        title: title,
                        price: price,
                        condition: condition,
                        description: description,
                        coverURL: firebaseUri,
                    }
                    const response = await updateUploadedBook(body);
                    if (response && response.isUpdate) {
                        let userdata = data.userBookReducerState.userBookData;
                        for (i = 0; i < data.userBookReducerState.userBookData.length;i++){
                            if (userdata[i]._id == props.route.params.item._id){
                                userdata[i].title = title;
                                userdata[i].description = description;
                                userdata[i].price = price;
                                userdata[i].condition = condition;
                                userdata[i].coverURL = firebaseUri;
                                break;
                            }
                        }
                        updateUserBook(userdata);
                        toastOn("Book Details Updated")
                        props.navigation.pop();
                    }
                } else {
                    aleartOn("Please select the prifile picture")
                }
            } else {
                aleartOn("Please enter all the details")
            }
        } else {
            aleartOn("Please wait to upload image")
        }
    }
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity
                        onPress={() => props.navigation.pop()}
                    >
                        <Image
                            style={{ ...CommonStyles.icon1Style, marginHorizontal: 15 * unit }}
                            resizeMode="contain"
                            source={require('../../../assets/backPurple/back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={CommonStyles.font4Purple}>Book Details</Text>
                </View>
                <TouchableOpacity
                    onPress={() => setIsEdit(true)}
                >
                    <Image
                        style={{...CommonStyles.icon1Style,marginRight:15* unit}}
                        resizeMode="contain"
                        source={require('../../../assets/edit/edit.png')}
                    />
                </TouchableOpacity>
            </View>
            
            {
                isEdit?
                    <ScrollView>
                        <MediaSelection
                            flag={mediaFlag}
                            lable="Select Media:"
                            flagChange={handleMediaFlag}
                            data={mediaData}
                            fn={onChangeMedia}
                        />
                        <TouchableOpacity
                            style={{...CommonStyles.imageView4,...CommonStyles.centerAlignMent,borderWidth:0}}
                            onPress={() => setMediaFlag(true)}
                        >
                            {
                                coverURL ?
                                    <View>
                                        <Image
                                            source={{ uri: coverURL }}
                                            style={CommonStyles.imageView4}
                                        />
                                        {
                                            imageLoader && (
                                                <ActivityIndicator
                                                    style={{ position: 'absolute', top: width*0.23, right: width *0.18 }}
                                                />
                                            )
                                        }
                                    </View>


                                    :
                                    <View style={CommonStyles.centerAlignMent }>
                                        <Image
                                            style={CommonStyles.icon2Style}
                                            resizeMode="contain"
                                            source={require('../../../assets/picture/picture.png')}
                                        />
                                        <Text style={CommonStyles.font1Black}>Book Image:</Text>

                                    </View>
                            }

                        </TouchableOpacity>
                        <Text style={{ ...CommonStyles.font1Black, textAlign: 'center', marginTop: 10 * unit }}>{coverURL ? "Book Image::" : ''}</Text>
                        <TextFeild
                            lable={"Book's Title:"}
                            onChange={onChangeTitle}
                            value={title}
                        />
                        <TextFeild
                            lable={"Book's Price"}
                            onChange={onChangePrice}
                            value={price}
                            keypadtipe="decimal-pad"
                        />
                        <DropDawnList
                            value={condition}
                            lable="Book's Condition:"
                            data={conditionData}
                            fn={onChangeCondition}
                        />
                        <TextFeild
                            lable={"Book's Description:"}
                            onChange={onChangeDescription}
                            value={description}
                            ismultipleline={true}
                        />
                    </ScrollView>
                    :
                    <ScrollView>
                        <Image
                            source={{ uri: coverURL }}
                            style={CommonStyles.imageView4}
                        />
                        <View style={{ marginLeft: 15 * unit, marginTop: 15 * unit }}>
                            <Text style={CommonStyles.font4Purple}>{title}</Text>
                            <Text style={{...CommonStyles.font2Black,fontWeight:'300'}}>{"Book's Condition: " + condition}</Text>
                            <Text style={CommonStyles.font4Purple}>{"₹ "+price}</Text>
                            <Text style={{...CommonStyles.font2Black,fontWeight:'500',marginTop:10* unit}}>About Book:</Text>
                           
                            <View style={CommonStyles.textView}>
                                <Text style={{...CommonStyles.font1Black,fontWeight:'300'}}>
                                    {description}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
            }
            {
                isEdit &&(
                    <View style={styles.btnView}>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => onDescard()}
                        >
                            <Text style={styles.btnText}>Discard</Text>
                        </TouchableOpacity>
                        {
                           ( title != '' && condition != '' && price != '' && description != ''&& !imageLoader && firebaseUri!='')?
                                <TouchableOpacity style={styles.btn}
                                    onPress={() => onSave()}
                                >
                                    <Text style={styles.btnText}>Save</Text>
                                </TouchableOpacity>
                                : 
                                <View style={{...styles.btn,backgroundColor:Colors.blurPurple}}>
                                    <Text style={{...styles.btnText,color:Colors.black}}>Save</Text>
                                </View>
                        }
                        
                    </View>
                )

            }
            <ConfirmationAleart
                isVisible={confirmation}
                lable={'Are you sure?'}
                onPress={handleConfirmation}
            />
            {
                !isEdit && (
                    <RoundedButton
                        lable={"Remove book"}
                        onClick={() => setConfirmation(true)}
                        dark={true}
                        Style={{ marginBottom: 15 * unit }}
                        isEnable={true}
                    />
                )
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    btnView:{
        flexDirection: 'row', 
        marginVertical: 20 * unit, 
        alignItems: 'center', 
        justifyContent: 'space-evenly'
    },
    appBar: {
        marginVertical:10* unit,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn:{
        width:width*0.4,
        height:50* unit,
        backgroundColor:Colors.purple,
        borderRadius:10* unit,
        borderWidth:1,
        borderColor:Colors.purple,
        alignItems:'center',
        justifyContent:'center',
    },
    btnText:{
        fontSize:20* unit,
        color:Colors.white
    }
})