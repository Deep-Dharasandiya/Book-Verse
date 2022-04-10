import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native'
import { width,unit } from '../../constant/ScreenDetails'
import Colors from '../../constant/Colors'

export default function RoundedButton(props) {
    return (<View style={props.Style}>
        {
            props.isEnable?
                <TouchableOpacity
                    style={props.dark ? { ...styles.container, backgroundColor: Colors.purple } : styles.container}
                    onPress={props.onClick}
                >
                    <Text style={{ ...styles.lable, color: props.dark ? Colors.white : Colors.purple }}>
                        {props.lable}
                    </Text>

                </TouchableOpacity>
                :
                <View
                    style={props.dark ? { ...styles.container, backgroundColor: Colors.blurPurple } : styles.container}
                    onPress={props.onClick}
                >
                    <Text style={{ ...styles.lable, color:  Colors.purple }}>
                        {props.lable}
                    </Text>

                </View>
        }
    </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        height: 50 * unit,
        width:width*0.85,
        borderColor:Colors.purple,
        borderWidth:1.5,
        borderRadius: 25 * unit,
        alignItems:'center',
        justifyContent:'center',
        marginTop: 15 * unit,
        alignSelf:'center',
    },
    lable:{
        fontSize:18 * unit,
    }
})
