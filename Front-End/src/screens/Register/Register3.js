import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView ,ActivityIndicator} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
//styles
import CommonStyles from '../CommonStyles';
//utils
import Colors from '../../constant/Colors'
import { unit, width, height } from '../../constant/ScreenDetails'
import RoundedButton from '../../components/button/RoundedButton'
import { isValidPassword, isEmail} from '../../constant/Validation'
import TextFeild from '../../components/input/textFeild';
import DropDawnList from '../../components/input/DropDawnList'
import MediaSelection from '../../components/input/MediaSelection'
import CheckBox from '../../components/input/CheckBox';
import { registerUser } from '../../networkServices/AuthenticationServices'
import { aleartOn, toastOn } from '../../context/actions/commonActions'

export default function Register3(props) {
    const [profileUri, setProfileUri] = React.useState('');
    const [mediaFlag, setMediaFlag] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [city, setCity] = React.useState('');
    const [collage, setCollage] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setconfirmPassword] = React.useState('');
    const [isTerms, setIsTearms] = React.useState(false);
    const [firebaseUri , setFirebaseUri] = React.useState('');
    const [imageLoader , setImageLoader] = React.useState(false);

    let cityData = [{
        value: 'Gandhinagar',
    }, {
        value: 'Ahmedabad',
    }, {
        value: 'Surat',
    }];
    let collageData = [{
        value: 'LDRP-ITR',
    }, {
        value: 'GEC-Gandhinagar',
    }, {
        value: 'LJIT',
    }];
    let mediaData = [{
        value: 'Camera',
    }, {
        value: 'Gallery',
    }];
    
    function onChangeFirstName(text) {
        setFirstName(text);
    }
    function onChangeLastName(text) {
        setLastName(text);
    }
    function onChangeEmail(text) {
        setEmail(text);
    }
    function onChangeCity(value) {
        setCity(value);
    }
    function onChangeCollage(value) {
        setCollage(value);
    }
    function onChangePassword(text) {
        setPassword(text);
    }
    function onChangeComfirmPassword(text) {
        setconfirmPassword(text);
    }
    function onChangeMedia(text){
        if (text =='Camera'){
            onChangeCameraImage();
        }else{
            onChangeGelleryImage();
        }
    }
    function handleMediaFlag(flag){
        setMediaFlag(flag);
    }
    function onCheckTearms() {
        setIsTearms(!isTerms);
    }
    function onTerms() {
        props.navigation.navigate('TermsAndCondition')
    }
    function onPolicy() {
        props.navigation.navigate('PrivacyPolicy')
    }
    const highlightTerms = string =>
        <Text
            style={CommonStyles.underLineFontPurple}
            onPress={() => onTerms()}
        >{string} </Text>


    const highlightPolicy = string =>
        <Text
            style={CommonStyles.underLineFontPurple}
            onPress={onPolicy}
        >{string} </Text>

    async function uploadImage(uri){
        setImageLoader(true);
        const reference = storage().ref(`Profile Picture/Profile_${props.route.params.contactNumber}.png`);
        await reference.putFile(uri);
        setFirebaseUri(await storage().ref(`Profile Picture/Profile_${props.route.params.contactNumber}.png`).getDownloadURL())
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
                    setProfileUri(response.assets[0]['uri']);
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
                    setProfileUri(response.assets[0]['uri']);
                    uploadImage(response.assets[0]['uri']);
                }

            }
        });

    }
    async function onRegister() {
        if(!imageLoader){
            if (firstName != '' && lastName != '' && email != '' && city != '' && collage != '' && password != '' && confirmPassword != '' && firebaseUri != '') {
                if (profileUri != '') {
                    if (isEmail(email)) {
                        if (isValidPassword(password)) {
                            if (password == confirmPassword) {
                                if (isTerms) {
                                    const body = {
                                        firstName: firstName,
                                        lastName: lastName,
                                        email: email,
                                        contactNumber: props.route.params.contactNumber,
                                        city: city,
                                        college: collage,
                                        password: password,
                                        profileURL: firebaseUri,
                                        fcmToken:'',
                                    }
                                   const response= await registerUser(body);
                                    if (response && response.isRegister){
                                        toastOn("Sucessfully Register.")
                                       props.navigation.pop();
                                       props.navigation.pop();
                                   }
                                } else {
                                    aleartOn("Please accept the Terms and Condition")
                                }
                            } else {
                                aleartOn("Both password should be same")
                            }
                        } else {
                            aleartOn("Enter Valid Password")
                        }
                    } else {
                        aleartOn("Enter Valid Email address")
                    }
                } else {
                    aleartOn("Please select the prifile picture")
                }
            } else {
                aleartOn("Please enter all the details")
            }
        }else{
            aleartOn("Please wait to upload image")
        }
    }
    return (
        <View style={CommonStyles.containerPurple}>
            <View style={CommonStyles.headerView}>
                <TouchableOpacity
                    onPress={() => props.navigation.pop()}
                >
                    <Image
                        style={CommonStyles.icon1Style}
                        resizeMode="contain"
                        source={require('../../assets/back/back.png')}
                    />
                </TouchableOpacity>
                <Text style={{...CommonStyles.font4White,marginLeft:15* unit}}>
                    Register
                </Text>
            </View>
            <View style={CommonStyles.cardWhite}>
                <ScrollView>
                <View style={CommonStyles.textView}>
                    <Text style={CommonStyles.font1Black}>
                        Please enter your Details for Registration on Bookerse.
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
                        style={{ ...CommonStyles.imageView2, alignSelf: 'center' ,borderWidth:0}}
                    onPress={() => setMediaFlag(true)}
                >
                    {
                        profileUri?
                        <View>
                            <Image
                                source={{ uri: profileUri }}
                                style={CommonStyles.imageView2}
                            />
                            {
                                imageLoader &&(
                                    <ActivityIndicator
                                        style={{ position: 'absolute', top: 63 * unit, right: 63 * unit }}
                                    />
                                )
                            }
                        </View>
                        
        
                        :
                        <View style={{...CommonStyles.imageView2,...CommonStyles.centerAlignMent}}>
                            <Image
                                style={styles.pictureSign}
                                //resizeMode="contain"
                                source={require('../../assets/picture/picture.png')}
                            />
                            <Text style={{...CommonStyles.font1Black,marginTop:10* unit}}>Profile Image:</Text>
                            
                        </View>
                    }
                     
                </TouchableOpacity>
                    <Text style={{...CommonStyles.font1Black,textAlign:'center',marginTop:5* unit}}>{profileUri ? "Profile Image:" : ''}</Text>
                <TextFeild
                    lable={"First Name"}
                    onChange={onChangeFirstName}
                    value={firstName}
                />
                <TextFeild
                    lable={"Last Name"}
                    onChange={onChangeLastName}
                    value={lastName}
                />
                <TextFeild
                    lable={"Email Address"}
                    onChange={onChangeEmail}
                    value={email}
                    keypadtipe="email-address"
                />
                <DropDawnList
                    value={city}
                    lable="Select Your City:"
                    data={cityData}
                    fn={onChangeCity}
                />
                <DropDawnList
                    value={collage}
                    lable="Select Your Collage:"
                    data={collageData}
                    fn={onChangeCollage}
                />
                <TextFeild
                    lable={"New Password"}
                    onChange={onChangePassword}
                    value={password}
                    secureText={true}
                />
                <TextFeild
                    lable={"Confirm Password"}
                    onChange={onChangeComfirmPassword}
                    value={confirmPassword}
                    secureText={true}
                />
                <View style={styles.termsView}>
                    <CheckBox
                        onCheck={onCheckTearms}
                        value={isTerms}
                    />
                        <View style={{ flexDirection: 'row', ...CommonStyles.centerAlignMent, marginLeft: 10 * unit }}>
                            <Text style={CommonStyles.font1Black}>I accept {highlightTerms('Terms & Conditions ')}and consent to the {highlightPolicy('Privacy Policy')}.</Text>
                    </View>
                </View>
                <RoundedButton
                    lable={"Register"}
                    onClick={onRegister}
                    Style={{ marginTop:20* unit,marginBottom:20* unit}}
                    dark={true}
                        isEnable={firstName != '' && lastName != '' && email != '' && city != '' && collage != '' && password != '' && confirmPassword != '' 
                        && firebaseUri != '' && isTerms&&!imageLoader}
                />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    termsView: {
        alignSelf: 'center',
        marginTop: 15 * unit,
        flexDirection: 'row',
        width: width * 0.85,
    },
})
