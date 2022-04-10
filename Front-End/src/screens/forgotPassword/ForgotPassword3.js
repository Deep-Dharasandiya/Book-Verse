import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
//styles
import CommonStyles from '../CommonStyles'
//utils
import { unit } from '../../constant/ScreenDetails'
import RoundedButton from '../../components/button/RoundedButton'
import { isValidPassword } from '../../constant/Validation'
import TextFeild from '../../components/input/textFeild'; 
import { forgotPassword } from '../../networkServices/AuthenticationServices'
import { aleartOn, toastOn } from '../../context/actions/commonActions'

export default function ForgotPassword3(props) {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setconfirmPassword] = React.useState('');
    function onChangePassword(text) {
        setPassword(text);
    }
    function onChangeComfirmPassword(text) {
        setconfirmPassword(text);
    }
    async function onSend() {
        if (password != '' && confirmPassword !='') {
            if (isValidPassword(password)) {
                if(password==confirmPassword){
                    const body = {
                        contactNumber: props.route.params.contactNumber,
                        password: password,
                    }
                    const response = await forgotPassword(body);
                    if (response && response.isUpdate) {
                        toastOn("Successfully password changed")
                        props.navigation.pop();
                        props.navigation.pop();

                    }
                }else{
                    aleartOn("Both password should be same")
                }
            } else {
                aleartOn("Enter Valid Password")
            }

        } else {
            aleartOn("Please enter the Both Password")
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
                    Change the Password
                </Text>
            </View>
            <View style={CommonStyles.cardWhite}>
                <View style={CommonStyles.textView}>
                    <Text style={CommonStyles.font1Black}>
                        Please enter your New password.
                    </Text>
                </View>
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
                <RoundedButton
                    lable={"Submit"}
                    onClick={onSend}
                    dark={true}
                    isEnable={password != '' && confirmPassword != ''}
                    Style={{marginTop:20* unit}}
                />
            </View>
        </View>
    )
}