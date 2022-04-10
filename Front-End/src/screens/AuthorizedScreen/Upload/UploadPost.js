import React from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//styles
import CommonStyles from '../../CommonStyles';
//utils
import { unit ,width} from '../../../constant/ScreenDetails'
import RoundedButton from '../../../components/button/RoundedButton'
import TextFeild from '../../../components/input/textFeild';
import DropDawnList from '../../../components/input/DropDawnList'
import MediaSelection from '../../../components/input/MediaSelection'
import storage from '@react-native-firebase/storage';
import { uploadBook } from '../../../networkServices/AuthenticationServices'
import { rootContext } from '../../../context/store/ContextStore'
import { aleartOn, toastOn } from '../../../context/actions/commonActions'
import { addNewUserBook } from '../../../context/actions/userBookAction'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function UoloadPost(props) {

    const [coverUri, setCoverUri] = React.useState('');
    const [mediaFlag, setMediaFlag] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [condition, setCondition] = React.useState('');
    const [firebaseUri, setFirebaseUri] = React.useState('');
    const [imageLoader, setImageLoader] = React.useState(false);

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
                    setCoverUri(response.assets[0]['uri']);
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
                    setCoverUri(response.assets[0]['uri']);
                    uploadImage(response.assets[0]['uri']);
                }

            }
        });

    }
    async function onRegister() {
        if (!imageLoader) {
            if (title != '' && condition != '' && price != '' && description != '') {
                if (firebaseUri != '') {
                    const body = {
                        userID: data.commonReducerState.userDetails._id,
                        title: title,
                        price: price,
                        condition: condition,
                        coverURL: firebaseUri,
                        description:description
                    }
                    const response = await uploadBook(body);
                    if (response && response.isUpload) {
                        toastOn("Book Uploaded");
                        setTitle('');
                        setDescription('');
                        setPrice('');
                        setCondition('');
                        setFirebaseUri('');
                        setCoverUri('');
                        addNewUserBook(response.data)
                        props.navigation.navigate('Uploaded Books');
                       
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
            <ScrollView>
                <View style={CommonStyles.textView}>
                    <Text style={{...CommonStyles.font1Black,marginBottom:10* unit}}>
                        Please enter book's Details.
                    </Text>
                </View>
                <MediaSelection
                    flag={mediaFlag}
                    lable="Select Media:"
                    flagChange={handleMediaFlag}
                    data={mediaData}
                    fn={onChangeMedia}
                />
                <TouchableOpacity
                    style={{...CommonStyles.imageView4,borderWidth:0}}
                    onPress={() => setMediaFlag(true)}
                >
                    {
                        coverUri ?
                            <View>
                                <Image
                                    source={{ uri: coverUri }}
                                    style={CommonStyles.imageView4}
                                />
                                {
                                   imageLoader && (
                                        <ActivityIndicator
                                            style={{ position: 'absolute', top: width*0.24, right: width*0.185 }}
                                        />
                                    )
                                }
                            </View>
                            :
                            <View style={{ ...CommonStyles.imageView4 ,...CommonStyles.centerAlignMent,backgroundColor:Colors.white}}>
                                <Image
                                    style={CommonStyles.icon2Style}
                                    resizeMode="contain"
                                    source={require('../../../assets/picture/picture.png')}
                                />
                                <Text style={CommonStyles.font1Black}>Book Image:</Text>
                            </View>
                    }
                </TouchableOpacity>
                <Text style={{...CommonStyles.font1Black,textAlign:'center',marginTop:10* unit}}>{coverUri ? "Book Image:" : ''}</Text>
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
                <RoundedButton
                    lable={"Upload Book"}
                    onClick={onRegister}
                    dark={true}
                    isEnable={title != '' && condition != '' && price != '' && description != '' && !imageLoader && firebaseUri!=''}
                    Style={{ marginVertical: 20 * unit }}
                />
            </ScrollView>
        </View>
    )
}