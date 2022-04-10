import React from 'react'
import { Text, View ,Image,TouchableOpacity} from 'react-native'
//styles
import CommonStyles from '../CommonStyles'
//utils
import { unit } from '../../constant/ScreenDetails'
import PhoneNumberFeild from '../../components/input/PhoneNumberFeild'
import RoundedButton from '../../components/button/RoundedButton'
import { isPhoneNumber } from '../../constant/Validation'
import { checkMobileNumberRegister } from '../../networkServices/AuthenticationServices'
import { aleartOn } from '../../context/actions/commonActions'

export default function ForgotPassword1(props) {
    const [contactNumber, setContactNumber] = React.useState('');
    function onChangeContactNumber(text) {
        setContactNumber(text);
    }
    async function onSend(){
        if (contactNumber != ''){
            if (isPhoneNumber(contactNumber)) {
                const response = await checkMobileNumberRegister({ contactNumber:  "+91" + contactNumber });
                if (response && response.isRegister) {
                    props.navigation.navigate('ForgotPassword2', { contactNumber: "+91" + contactNumber })
                } else {
                    aleartOn('Number not register');
                }
            }else{
                aleartOn("Enter Valid Contact Number")
            }
           
        }else{
            aleartOn("Please enter the Register Contact Number")
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
                    Forgot Password
                </Text>
            </View>
            <View style={CommonStyles.cardWhite}>
                <View style={CommonStyles.textView}>
                    <Text style={CommonStyles.font1Black}>
                        Please enter your email address to reset your password.
                    </Text>
                </View>
                <PhoneNumberFeild
                    lable={"Contact Number(XXXXXXXXXX)"}
                    onChange={onChangeContactNumber}
                    value={contactNumber}
                />
                <View style={{marginTop:10 * unit}}>
                    <RoundedButton
                        lable={"OTP Send"}
                        onClick={onSend}
                        dark={true}
                        isEnable={contactNumber.length==10}
                    />
                </View>
               
            </View>
        </View>
    )
}