import React from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
//styles
import CommonStyles from '../CommonStyles';
//utils
import Colors from '../../constant/Colors';
import { unit, width } from '../../constant/ScreenDetails';

export default function SoldHistoryDetails(props) {
    const [bookDetails, setBookDetails] = React.useState(props.route.params.item);
    
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
                <TouchableOpacity
                    onPress={() => props.navigation.pop()}
                >
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginHorizontal: 15 * unit }}
                        resizeMode="contain"
                        source={require('../../assets/back/back.png')}
                    />
                </TouchableOpacity>
                <Text style={CommonStyles.font4White}>Book Details</Text>
            </View>

            <ScrollView>
                <Image
                    source={{ uri: bookDetails.coverURL }}
                    style={{ ...CommonStyles.imageView4, marginTop: 15 * unit }}
                />
                <View style={{ marginLeft: 15 * unit, marginTop: 15 * unit }}>
                    <Text style={CommonStyles.font4Purple}>{bookDetails.title}</Text>
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>{"Book's Condition: " + bookDetails.condition}</Text>
                    <Text style={CommonStyles.font4Purple}>{"₹ " + bookDetails.price}</Text>
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '500', marginTop: 10 * unit }}>About Book:</Text>
                    <View style={{ ...CommonStyles.textView, marginTop: 10 * unit }}>
                        <Text style={{ ...styles.normalText, fontSize: 15 * unit, fontWeight: '300' }}>
                            {bookDetails.description}
                        </Text>
                    </View>
                    <View style={{ height: 0.5 * unit, width: width * 0.90, backgroundColor: Colors.black, marginVertical: 15 * unit }} />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '500' }}>Purchased By:</Text>
                    <View style={styles.profileView}>
                        <View style={{ marginLeft: 10 * unit }}>
                            <Text style={CommonStyles.font3Purple}>{bookDetails.buyerID.firstName + " " + bookDetails.buyerID.lastName}</Text>
                            <Text style={{ ...CommonStyles.font1Black, fontWeight: '300' }}>{bookDetails.buyerID.college}</Text>
                            <Text style={{ ...CommonStyles.font1Black, fontWeight: '300' }}>{bookDetails.buyerID.city}</Text>
                        </View>
                        <Image
                            source={{ uri: bookDetails.buyerID.profileURL }}
                            style={{ ...CommonStyles.imageView1, marginRight: 15 * unit }}
                        />
                    </View>
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '500', marginTop: 10 * unit }}>Email:</Text>
                    <View style={{ ...CommonStyles.textView, marginTop: 0 }}>
                        <Text style={{ ...CommonStyles.font1Black, fontWeight: '300' }}>{bookDetails.buyerID.email}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    appBar: {
        paddingVertical: 15 * unit,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.purple
    },
    profileView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

})