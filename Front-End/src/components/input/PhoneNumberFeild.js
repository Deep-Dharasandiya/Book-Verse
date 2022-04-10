import React from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native'
import CommonStyles from '../../screens/CommonStyles'
import { width, unit } from '../../constant/ScreenDetails'
import Colors from '../../constant/Colors'

export default function PhoneNumberFeild(props) {
    const [color, setColor] = React.useState(Colors.gray);
    const [isView, setIsView] = React.useState(false);
    function onFocus() {
        setColor(Colors.purple)
    }
    function onBlur() {
        setColor(Colors.gray)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.lable}>{props.value ? props.lable : ''}</Text>
            <View >
                <TextInput
                    style={{ ...styles.textinput, borderColor: color, }}
                    keyboardType={"phone-pad"}
                    maxLength={10}
                    secureTextEntry={props.secureText && (!isView)}
                    placeholder={props.lable}
                    fontSize={13 * unit}
                    multiline={props.ismultipleline}
                    placeholderTextColor={Colors.gray}
                    onChangeText={text => props.onChange(text)}
                    defaultValue={props.value}
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                />
                <View  style={{ ...styles.codeView, borderColor: color}}  >
                    <Text style={{...styles.lable,color:Colors.black,marginBottom:0}}>+91</Text>
                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginTop: 10 * unit,
    },
    textinput: {
        color: Colors.black,
        fontSize: 13 * unit,
        paddingVertical: 10 * unit,
        borderWidth: 1,
        borderRadius: 25 * unit,
        width: width * 0.85,
        height: 50 * unit,
        paddingLeft: width * 0.18,
        paddingRight: 10 * unit,
        paddingVertical: 10 * unit,

    },
    lable: {
        marginLeft: width * 0.05,
        fontSize: 13 * unit ,
        color: Colors.black,
        marginBottom:5* unit,
    },
    codeView:{
        position:'absolute',
        top:0,
        left:0,
        height:50* unit,
        paddingRight: width * 0.05,
        borderRadius:25* unit,
        borderWidth:1,
        ...CommonStyles.centerAlignMent,
        backgroundColor:Colors.blurPurple
    },
    downArrow: {
        position: 'absolute',
        height: 12 * unit,
        width: 12 * unit,
        right: 20,

    },
})
