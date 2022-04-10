import React from 'react'
import { StyleSheet, View ,TextInput} from 'react-native'
import { width,unit } from '../../constant/ScreenDetails';
import Colors from '../../constant/Colors';

export default function OTPTextInput(props) {
    const [color1, setColor1] = React.useState(Colors.gray);
    const [color2, setColor2] = React.useState(Colors.gray);
    const [color3, setColor3] = React.useState(Colors.gray);
    const [color4, setColor4] = React.useState(Colors.gray);
    const [color5, setColor5] = React.useState(Colors.gray);
    const [color6, setColor6] = React.useState(Colors.gray);
    const refpin1= React.useRef('');
    const refpin2= React.useRef('');
    const refpin3= React.useRef('');
    const refpin4= React.useRef('');
    const refpin5 = React.useRef('');
    const refpin6 = React.useRef('');
    const [pin1 , setPin1] = React.useState("");
    const [pin2 , setPin2] = React.useState("");
    const [pin3 , setPin3] = React.useState("");
    const [pin4 , setPin4] = React.useState("");
    const [pin5, setPin5] = React.useState("");
    const [pin6, setPin6] = React.useState("");
    function onFocus(no) {
        if(no==1){
            setColor1(Colors.purple)
        }else if(no==2){
            setColor2(Colors.purple)
        }else if(no==3){
            setColor3(Colors.purple)
        }else if(no==4){
            setColor4(Colors.purple)
        }else if (no == 5) {
            setColor5(Colors.purple)
        }else{
            setColor6(Colors.purple)
        }
    }
    function onBlur(no) {
        if (no == 1) {
            setColor1(Colors.gray)
        } else if (no == 2) {
            setColor2(Colors.gray)
        } else if (no == 3) {
            setColor3(Colors.gray)
        } else if (no == 4) {
            setColor4(Colors.gray)
        } else if (no == 5) {
            setColor5(Colors.gray)
        } else {
            setColor6(Colors.gray)
        }
        
    }
    return (
        <View style={styles.otpInput}>
            <TextInput
                ref={refpin1}
                style={{ ...styles.textinput, borderColor: color1}}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => {
                    setPin1(text);
                    if (text != '') {
                        refpin2.current.focus();
                    }
                    props.onChange(text + pin2 + pin3 + pin4 + pin5 + pin6);
                }}
                defaultValue={props.value}
                onFocus={() => onFocus(1)}
                onBlur={() => onBlur(1)}
            />
            <TextInput
                ref={refpin2}
                style={{ ...styles.textinput, borderColor: color2 }}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => {
                    setPin2(text);
                    if (text != '') {
                        refpin3.current.focus();
                    }
                    props.onChange(pin1 + text + pin3 + pin4 + pin5 + pin6);
                }}
                defaultValue={props.value}
                onFocus={() => onFocus(2)}
                onBlur={() => onBlur(2)}
            />
            <TextInput
                ref={refpin3}
                style={{ ...styles.textinput, borderColor: color3 }}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => {
                    setPin3(text);
                    if (text != '') {
                        refpin4.current.focus();
                    }
                    props.onChange(pin1 + pin2 + text + pin4 + pin5 + pin6);
                }}
                defaultValue={props.value}
                onFocus={() => onFocus(3)}
                onBlur={() => onBlur(3)}
            />
            <TextInput
                ref={refpin4}
                style={{ ...styles.textinput, borderColor: color4 }}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => {
                    setPin4(text);
                    if (text != '') {
                        refpin5.current.focus();
                    }
                    props.onChange(pin1 + pin2 + pin3 + text + pin5 + pin6);
                }}
                defaultValue={props.value}
                onFocus={() => onFocus(4)}
                onBlur={() => onBlur(4)}
            />
            <TextInput
                ref={refpin5}
                style={{ ...styles.textinput, borderColor: color5 }}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => {
                    setPin5(text);
                    if (text != '') {
                        refpin6.current.focus();
                    }
                    props.onChange(pin1 + pin2 + pin3 + pin4 + text + pin6);
                }}
                defaultValue={props.value}
                onFocus={() => onFocus(5)}
                onBlur={() => onBlur(5)}
            />
            <TextInput
                ref={refpin6}
                style={{ ...styles.textinput, borderColor: color6}}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => {
                    setPin6(text);
                    props.onChange(pin1 + pin2 + pin3 + pin4 + pin5 + text);
                }}
                defaultValue={props.value}
                onFocus={() => onFocus(6)}
                onBlur={() => onBlur(6)}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    otpInput:{
        width:width*0.85,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:width*0.85,
        alignSelf:'center',

    },
    textinput: {
        color: Colors.black,
        fontSize:18*unit,
        textAlign:'center',
        paddingVertical: 10 * unit,
        borderWidth: 1,
        borderRadius: 10 * unit,
        width: width * 0.10,
        height: 50 * unit,
        paddingVertical: 10 * unit,
        marginTop: 5 * unit,
    },
})

