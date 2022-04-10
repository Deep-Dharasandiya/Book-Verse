import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,Modal,ScrollView,Image} from 'react-native'
import CommonStyles from '../../screens/CommonStyles';
import Colors from '../../constant/Colors';
import { width,unit } from '../../constant/ScreenDetails';


export default function DropDawnList(props) {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const option = (props.data).map((item, index) => {
        return (
            <TouchableOpacity
                key={item.value}
                style={styles.optionView}
                onPress={() => {
                    props.fn(item.value);
                    setIsModalVisible(false);
                }}
            >
                <Text>{item.value}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View style={styles.body}>
            <Text style={styles.lable}>{props.value ? props.lable : ''}</Text>
            <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={styles.btnStyle}
            >
                <Text style={{...styles.lable,color:props.value?Colors.black:Colors.gray} }>{props.value ? props.value : props.lable}</Text>   
                <Image
                    style={styles.downArrow}
                    resizeMode="contain"
                    source={require('../../assets/downArrow/downArrow.png')}
                />
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType='none'
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}>
                <TouchableOpacity
                    onPress={() => setIsModalVisible(false)}
                    style={{ flex: 1,...CommonStyles.centerAlignMent }}
                >
                    <View style={styles.container}>
                        <ScrollView>
                            <Text style={styles.title} >
                                {props.lable}
                            </Text>
                            {option}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        width: width * 0.85, 
        alignSelf: 'center', 
        marginTop: 10 * unit
    },
    btnStyle: {
        height:50 * unit,
        width:width*0.85,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius: 25 *unit,
        marginTop: 15 * unit,
        borderColor:Colors.gray,
        borderWidth:1,
        backgroundColor:Colors.white
        
    },
    lable: {
        marginLeft: 13 * unit,
        fontSize:13 * unit,
        color: Colors.black
    },
    downArrow: {
        position: 'absolute',
        height: 12 * unit,
        width: 12 * unit,
        right: 20 * unit,
    },
    btnText: {
        fontSize: 20 * unit,
        fontWeight: '600',
        color: Colors.gray
    },
    icon: {
        marginHorizontal: 20 * unit,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    container: {
        padding: 20 * unit,
        marginVertical: 50 * unit,
        width: width * 0.8,
        backgroundColor: Colors.white,
        borderRadius: 10 * unit,
        shadowColor: Colors.black,
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 20 * unit,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20 * unit,
        color: Colors.black,
        fontWeight: '600',
        marginBottom: 15 * unit,
    },
    optionView: {
        backgroundColor: Colors.blurPurple,
        marginVertical: 5 * unit,
        padding: 10 * unit,
        borderRadius: 5 * unit,
    }
})
