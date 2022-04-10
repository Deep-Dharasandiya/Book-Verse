import React from 'react'
import { StyleSheet, Text, View ,Modal,TouchableOpacity} from 'react-native'
import CommonStyles from '../screens/CommonStyles';
import Colors from '../constant/Colors';
import { unit,width } from '../constant/ScreenDetails';
import { aleartOff } from '../context/actions/commonActions';
import { rootContext } from '../context/store/ContextStore';

export default function Aleart(props) {
    const data = React.useContext(rootContext);
    return (
        <Modal
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          animationType='none'
            visible={data.commonReducerState.isAleart}
          onRequestClose={() => {
              aleartOff();
          }}
        >
             <TouchableOpacity
                onPress={() => aleartOff()}
                style={{flex:1,...CommonStyles.centerAlignMent}}
                >
                <View style={styles.container}>
                    <Text style={{ ...CommonStyles.font1Black, marginTop: 10 * unit }}>{data.commonReducerState.aleartMessage}</Text>
                    <View style={styles.btn}>
                        <Text style={{...CommonStyles.font2Purple,fontWeight:'600'}}>OK</Text>
                        </View>

                </View>
            </TouchableOpacity>
         
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5 * unit,
        width:  width * 0.9 ,
        marginVertical: 20 * unit,
        backgroundColor: Colors.white,
        borderColor: Colors.purple,
        borderWidth: 1,
        borderRadius: 10 * unit,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn:{
        width: 60 * unit, 
        backgroundColor: Colors.blurPurple, 
        padding: 5 * unit, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 5 * unit, 
        marginVertical: 10 * unit
    }
})


