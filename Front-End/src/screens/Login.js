import React from 'react'
import { Text, View, Image, TouchableOpacity, Keyboard} from 'react-native'
import messaging from '@react-native-firebase/messaging';
//styles
import CommonStyles from './CommonStyles';
//utils
import {height, unit, width} from '../constant/ScreenDetails'
import TextFeild from '../components/input/textFeild'; 
import CheckBox from '../components/input/CheckBox';
import RoundedButton from '../components/button/RoundedButton';
import { isPhoneNumber, isValidPassword } from '../constant/Validation';
import PhoneNumberFeild from '../components/input/PhoneNumberFeild';
import { login } from '../networkServices/AuthenticationServices';
import { aleartOn, setLogin } from '../context/actions/commonActions';
import { ScrollView } from 'react-native-gesture-handler';


export default function Login(props) {

    const [contactNumber, setContactNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isTerms , setIsTearms] = React.useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
        //keyBoard Handler
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function onChangeContactNumber(text){
        setContactNumber(text);
    }
    function onChangePassword(text) {
        setPassword(text);
    }
    function onCheckTearms(){
        setIsTearms(!isTerms);
    }
    function onRegister(){
        props.navigation.navigate('Register1');
    }
    function onFAQ() {
        props.navigation.navigate('FAQ');
    }
    function onForgotPassword(){
        props.navigation.navigate("ForgotPassword1");
    }
    function onTerms(){
        props.navigation.navigate('TermsAndCondition')
    }
    function onPolicy(){
        props.navigation.navigate('PrivacyPolicy')
    }
    async function onLogin() {
        if (contactNumber != '' && password != '') {
            if (isPhoneNumber(contactNumber)) {
                if (isValidPassword(password)) {
                    if (isTerms) {
                        const body = {
                            contactNumber: "+91" + contactNumber,
                            password: password,
                            fcmToken: await messaging().getToken()
                        }
                        const response = await login(body);
                        if (response && response.isLogin) {
                            setLogin(response.data);
                            //props.navigation.navigate('BottomTabNavigation');
                        } else {
                            if (response) {
                                aleartOn("Please enter correct credential");
                            }
                        }
                    } else {
                        aleartOn("Please accept the Terms and Condition")
                    }
                } else {
                    aleartOn("Password not valid")
                }
            } else {
                aleartOn("Enter Valid Contact Number")
            }
        } else {
            aleartOn("Please enter both Register Contact Number and password")
        }
    }
    const highlightTerms = string =>
      <Text 
        style={CommonStyles.underLineFontPurple}
        onPress={()=>onTerms()}
      >{string} </Text>
      

    const highlightPolicy = string =>
        <Text 
            style={CommonStyles.underLineFontPurple}
            onPress={onPolicy}
        >{string} </Text>
        
    return (
        <View style={CommonStyles.containerPurple}>
            <Image
                style={{ ...CommonStyles.HorizontalLogo ,marginTop: height * 0.05}}
                resizeMode="contain"
                source={require('../assets/logoHorizontal/logo.png')}
            />
           <ScrollView style={{...CommonStyles.cardWhite,marginTop:height*0.05}}>
                <PhoneNumberFeild
                    lable={"Contact Number(XXXXXXXXXX)"}
                    onChange={onChangeContactNumber}
                    value={contactNumber}
                />
                <TextFeild
                    lable={"Password:"}
                    onChange={onChangePassword}
                    value={password}
                    secureText={true}
                />
                <View style={{flexDirection:'row',...CommonStyles.centerAlignMent,width:width*0.85,alignSelf:'center',marginTop:15* unit}}>
                    <CheckBox 
                        onCheck={onCheckTearms}
                        value={isTerms}
                    />
                    <View style={{ flexDirection: 'row',...CommonStyles.centerAlignMent,marginLeft: 10 * unit}}>
                        <Text style={CommonStyles.font1Black}>I accept {highlightTerms('Terms & Conditions ')}and consent to the {highlightPolicy('Privacy Policy')}.</Text>
                    </View>
                </View>
                <RoundedButton
                    lable={"Log in"}
                    onClick={onLogin}
                    dark={true}
                    isEnable={contactNumber != '' && password != '' && isTerms}
                />
                <TouchableOpacity
                    onPress={onForgotPassword}
                style={{ marginTop: 15 * unit,alignSelf:'center',width:width*0.85}}
                >
                    <Text style={{...CommonStyles.font1Purple,alignSelf:'flex-end'}}>Forgot Password?</Text>
                </TouchableOpacity>
                
           </ScrollView>
            {
                !isKeyboardVisible && (
                    <View style={CommonStyles.LoginLandingBottomView}>
                        <TouchableOpacity
                            onPress={onFAQ}
                        >
                            <Text style={{ ...CommonStyles.font2Purple, marginBottom: 5 * unit }}>Frequently Asked Questions</Text>
                        </TouchableOpacity>

                        <RoundedButton
                            lable={"Register"}
                            onClick={onRegister}
                            dark={false}
                            isEnable={true}
                        />
                        <Text style={{ ...CommonStyles.font2Purple, marginTop: 5 * unit }}>version 2.03.08</Text>
                    </View>
                )
            }
        </View>
    )
}