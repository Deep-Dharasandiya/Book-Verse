import React from 'react'
import {  Text, View, Image, StatusBar, Keyboard, TouchableOpacity} from 'react-native'
import SplashScreen from 'react-native-splash-screen';
//Styles
import CommonStyles from './CommonStyles';
//utils
import { unit } from '../constant/ScreenDetails'
import RoundedButton from '../components/button/RoundedButton';


export default function LandingScreen(props) {
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
        SplashScreen.hide();

        //KeyBoard Handler
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); 
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function onSignIn(){
        props.navigation.navigate('Login');
    }
    function onRegister() {
        props.navigation.navigate('Register1');
    }
    function onFAQ() {
        props.navigation.navigate('FAQ');
    }

    return (
        <View style={CommonStyles.containerWhite}>
            <Image
                style={{...CommonStyles.VerticalLogo,marginTop:150* unit}}
                source={require('../assets/logoVertical/logo.png')}
            />
            {
                !isKeyboardVisible &&(
                    <View style={CommonStyles.LoginLandingBottomView}>
                        <TouchableOpacity
                            onPress={onFAQ}
                        >
                            <Text style={{...CommonStyles.font2Purple,marginBottom:5* unit}}>Frequently Asked Questions</Text>
                        </TouchableOpacity>

                        <RoundedButton
                            lable={"Log in"}
                            onClick={onSignIn}
                            dark={false}
                            isEnable={true}
                        />
                        <RoundedButton
                            lable={"Register"}
                            onClick={onRegister}
                            dark={true}
                            isEnable={true}
                        />
                        <Text style={{ ...CommonStyles.font2Purple, marginTop: 5 * unit }}>version 2.03.08</Text>
                    </View>
                )
            }
            
        </View>
    )
}