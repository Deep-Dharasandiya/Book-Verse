import React from 'react'
import { StyleSheet,TouchableOpacity,Image } from 'react-native'
import CommonStyles from '../../screens/CommonStyles'
import Colors from '../../constant/Colors'
import { unit } from '../../constant/ScreenDetails'

export default function CheckBox(props) {
    const [isCheck ,setIsCheck ] = React.useState(props.value);
    return (
        <TouchableOpacity
            style={{...styles.container,borderColor:isCheck?Colors.purple:Colors.gray,
                backgroundColor:isCheck?Colors.purple:Colors.white}}
            onPress={() => { 
                setIsCheck(!isCheck) ;
                props.onCheck();
            }}
        >
            {isCheck&&(
                <Image
                    style={styles.checkMark}
                    resizeMode="contain"
                    source={require('../../assets/checkMark/checkMark.png')}
                />
            )}
            
         </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.purple,
        height:30 * unit,
        width:30 * unit,
        borderRadius:15 * unit,
        borderWidth:1,
       ...CommonStyles.centerAlignMent
    },
    checkMark:{
        width:15 * unit,
        height:15 * unit,
    }
})
