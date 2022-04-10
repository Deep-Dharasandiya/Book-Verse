import React from 'react'
import { StyleSheet, Text, View, TextInput,Image,TouchableOpacity } from 'react-native'
import { width ,unit} from '../../constant/ScreenDetails'
import Colors from '../../constant/Colors'

export default function TextFeild(props) {
    const [color, setColor] = React.useState(Colors.gray);
    const [isView , setIsView] = React.useState(false);
    function onFocus(){
        setColor(Colors.purple)
    }
    function onBlur() {
        setColor(Colors.gray)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.lable}>{props.value?props.lable:''}</Text>
            <View>
                <TextInput
                    style={{ ...styles.textinput, borderColor: color,height:props.ismultipleline?100* unit:50* unit }}
                    keyboardType={props.keypadtipe}
                    maxLength={props.maxlength}
                    secureTextEntry={props.secureText &&(!isView)}
                    placeholder={props.lable}
                    fontSize={13 * unit}
                    multiline={props.ismultipleline}
                    placeholderTextColor={Colors.gray}
                    onChangeText={text => props.onChange(text)}
                    defaultValue={props.value}
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                />
                {
                    props.secureText &&(
                        <TouchableOpacity
                            style={styles.eye}
                            onPress={() => { setIsView(!isView) }}
                        >
                            <Image
                                resizeMode="contain"
                                source={isView ? require('../../assets/view/view.png') : require('../../assets/hide/hide.png') }
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignSelf:'center',
        marginTop:10 * unit,
    },
    textinput: {
        color: Colors.black,
        fontSize: 13 * unit,
        paddingVertical: 10 * unit,
        borderWidth: 1,
        borderRadius: 25 * unit,
        width: width * 0.85,
        height:50 * unit,
        paddingLeft: width * 0.05,
        paddingRight: 55 * unit,
        paddingVertical: 10 * unit,
        marginTop: 5 * unit,
        backgroundColor:Colors.white
    },
    lable:{
        marginLeft:13*unit,
        fontSize: 13 * unit,
        color:Colors.black
    },
    eye:{
        width:25 * unit,
        height: 20 * unit,
        position:'absolute',
        top:22 * unit,
        right: 18 * unit,
    }
})
