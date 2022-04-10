import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
//styles
import CommonStyles from '../CommonStyles';
//utils
import Colors from '../../constant/Colors';
import { unit, width } from '../../constant/ScreenDetails';
import { rootContext } from '../../context/store/ContextStore';
export default function ProfileDetails(props) {
    const data = React.useContext(rootContext);
    const [details, setDetails] = React.useState(data.commonReducerState.userDetails);
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.pop()}
                    >
                        <Image
                            style={{ ...CommonStyles.icon1Style, marginHorizontal: 15 * unit }}
                            resizeMode="contain"
                            source={require('../../assets/backPurple/back.png')}
                        />
                    </TouchableOpacity>
                    <Text style={CommonStyles.font4Purple}>My Account</Text>
                </View>
            </View>

            <ScrollView>
                <Image
                    source={{ uri: details.profileURL }}
                    style={{...CommonStyles.imageView2,alignSelf:'center'}}
                />
                <View style={{ marginLeft: 10 * unit, marginTop: 15 * unit }}>
                    <Text style={{...CommonStyles.font4Purple,alignSelf:'center'}}>{details.firstName + " " + details.lastName}</Text>
                    <View style={{...styles.detailsView,marginTop:30* unit}}>
                        <Text style={styles.detailsHeading}>{"Contact"}</Text>
                        <Text style={styles.detailsValue}>{details.contactNumber}</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={styles.detailsHeading}>{"Email"}</Text>
                        <Text style={styles.detailsValue}>{details.email}</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={styles.detailsHeading}>{"College"}</Text>
                        <Text style={styles.detailsValue}>{details.college}</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={styles.detailsHeading}>{"City"}</Text>
                        <Text style={styles.detailsValue}>{details.city}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    btnView: {
        flexDirection: 'row',
        marginVertical: 20 * unit,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    appBar: {
        marginVertical: 10 * unit,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn: {
        width: width * 0.4,
        height: 50 * unit,
        backgroundColor: Colors.purple,
        borderRadius: 10 * unit,
        borderWidth: 1,
        borderColor: Colors.purple,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 20 * unit,
        color: Colors.white
    },
    detailsView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 10 * unit,
        borderRadius:5* unit,
        borderBottomWidth:0.3,
        borderColor:Colors.black,
        paddingBottom:5* unit
    },
    detailsHeading:{
        ...CommonStyles.font2Black, 
        fontWeight: '600'
    },
    detailsValue:{
        ...CommonStyles.font2Black, 
        fontWeight: '300', 
        marginRight: 10 * unit, 
        marginLeft: 50 * unit
    }
})