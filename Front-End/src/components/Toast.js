import React from 'react'
import { StyleSheet, Text, View, Modal} from 'react-native'
import Colors from '../constant/Colors';
import { unit, width } from '../constant/ScreenDetails';
import { rootContext } from '../context/store/ContextStore';

export default function Toast(props) {
    const data = React.useContext(rootContext);
    return (
        <Modal
            transparent={true}
            supportedOrientations={['portrait', 'landscape']}
            animationType="fade"
            visible={data.commonReducerState.isToast}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{data.commonReducerState.toastMessage}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        bottom:0,
        width:width,
        backgroundColor:Colors.purple,
        justifyContent:'center',
        padding:10* unit,
    },
    text:{
        color: Colors.white, 
        fontSize: 15 * unit,
         fontWeight: '500'
    }
})


