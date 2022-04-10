import React from 'react'
import { StyleSheet, Text, View ,Modal,ActivityIndicator} from 'react-native'
import CommonStyles from '../screens/CommonStyles';
import {unit} from '../constant/ScreenDetails';
import Colors from '../constant/Colors'
export default function Loader(props) {
   
    return (
        <Modal
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          animationType='none'
          visible={props.isVisible}
        >
            <View  style={{flex:1,...CommonStyles.centerAlignMent}}>
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={props.isVisible}
                        color={Colors.lightblue}
                        size={'large'}
                        style={{marginVertical:15 *unit}}
                        />
                    <Text style={CommonStyles.font2Black}>Please Wait</Text>
                </View>
            </View>
         
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5 * unit,
        width: 200 * unit,
        marginVertical: 20 * unit,
        backgroundColor: Colors.white,
        borderColor: Colors.purple,
        borderWidth: 1,
        borderRadius: 10 * unit,
        shadowColor: Colors.purple,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10 * unit,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


