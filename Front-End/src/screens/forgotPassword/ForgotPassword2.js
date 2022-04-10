import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
//styles
import CommonStyles from '../CommonStyles';
//utils
import { unit } from '../../constant/ScreenDetails'
import RoundedButton from '../../components/button/RoundedButton'
import OTPTextInput from '../../components/input/OTPTextInput'
import { isValidPin } from '../../constant/Validation'
import { aleartOn, loadingOff, loadingStart, toastOn } from '../../context/actions/commonActions'

export default function ForgotPassword2(props) {
    const [otp, setotp] = React.useState('');
    const [confirmation, setConfirmation] = React.useState('');
    React.useEffect(() => {
        signInWithPhoneNumber();
        toastOn('OTP sent on ' + props.route.params.contactNumber)
    }, []);
    function onChangeOTP(text) {
        setotp(text);
    }
    async function signInWithPhoneNumber() {
        const confirmation = await auth().signInWithPhoneNumber(props.route.params.contactNumber);
        setConfirmation(confirmation);
    }
    async function confirmCode() {
        try {
            loadingStart();
            await confirmation.confirm(otp);
            loadingOff();
            toastOn("OTP verified sucessfully.")
            props.navigation.replace('ForgotPassword3', { contactNumber: props.route.params.contactNumber })
        } catch (error) {
           aleartOn('Invalid code.');
            loadingOff();
        }
    }
    function onVerify(){
        if(otp !=''){
            if(isValidPin(otp)){
                //confirmCode()
                props.navigation.replace('ForgotPassword3', { contactNumber: props.route.params.contactNumber })
            }else{
                aleartOn("OTP not valid")
            }
        }else{
            aleartOn('Please enter OTP')
        }
    }
    function onResendOtp() {
        signInWithPhoneNumber();
        toastOn('OTP resent on ' + props.route.params.contactNumber)
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
                    OTP Verification
                </Text>
            </View>
            <View style={CommonStyles.cardWhite}>
                <View style={CommonStyles.textView}>
                    <Text style={{...CommonStyles.font1Black,marginBottom:10* unit}}>
                        Please enter your OTP which is sent your Contact Number.
                    </Text>
                </View>
                <OTPTextInput
                    onChange={onChangeOTP}
                />
                <RoundedButton
                    lable={"Verify"}
                    onClick={onVerify}
                    dark={true}
                    isEnable={otp.length==6}
                    Style={{marginTop:15* unit}}
                />
                <RoundedButton
                    lable={"Resend OTP"}
                    onClick={onResendOtp}
                    dark={false}
                    isEnable={true}
                />
            </View>
        </View>
    )
}