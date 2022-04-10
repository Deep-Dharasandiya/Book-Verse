import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image ,FlatList,TextInput} from 'react-native'
//styles
import CommonStyles from '../../../CommonStyles';
//utils
import { rootContext } from '../../../../context/store/ContextStore';
import Colors from '../../../../constant/Colors';
import { unit } from '../../../../constant/ScreenDetails';
import { aleartOn } from '../../../../context/actions/commonActions';

export default function SellerChatList(props) {
    const [search, setSearch] = React.useState('');
    const contextData = React.useContext(rootContext);
    const [bookDetails, setBookDetails] = React.useState(props.route.params.item);
    const temp = contextData.userBookReducerState.userBookData.filter((item) => item._id == props.route.params.item._id)[0]
    if (temp != bookDetails) {
        if (temp) {
            setBookDetails(temp);
        }
    }
    function onChangeSearch(text) {
        setSearch(text);
    }
    function statusDecoder(status){
        if(status==0){
            return "";
        }else if(status==1){
            return "Awaiting buyer confirmation"
        }else if(status==2){
            return "Deal finalized, awaiting delivery"
        } else if (status == 20) {
            return "Buyer rejected the deal"
        }
        else if (status == 3) {
            return "Awaiting delivery confirmation"
        }
        else if (status == 4) {
            return "Buyer received the book"
        } else if (status == 40) {
            return "Buyer didn't receive book"
        } else {
            return ""
        }
    }
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
                <TouchableOpacity
                    onPress={() => props.navigation.pop()}
                >
                    <Image
                        style={{...CommonStyles.icon1Style,marginHorizontal:15* unit}}
                        resizeMode="contain"
                        source={require('../../../../assets/backPurple/back.png')}
                    />
                </TouchableOpacity>
                <Text style={CommonStyles.font4Purple}>Requests</Text>
            </View>
            <View style={{...CommonStyles.searchView,marginTop:0}}>
                <TextInput
                    style={CommonStyles.searchTextInput}
                    placeholder={"Search By Book's Name"}
                    fontSize={15 * unit}
                    placeholderTextColor={Colors.gray}
                    onChangeText={text => onChangeSearch(text)}
                    defaultValue={search}
                />
                <Image
                    style={{ position: 'absolute', ...CommonStyles.icon1Style, marginHorizontal: 10 * unit }}
                    resizeMode="contain"
                    source={require('../../../../assets/search/search.png')}
                />
            </View>
            {
                bookDetails.requests.filter((item) => (item.userID.firstName + item.userID.lastName).toLowerCase().includes(search.toLowerCase().replace(' ',''))).length!=0?
                    <FlatList
                        key={1}
                        data={bookDetails.requests.filter((item) => (item.userID.firstName + item.userID.lastName).toLowerCase().includes(search.toLowerCase().replace(' ', '')))}
                        listMode="SCROLLVIEW"
                        keyExtractor={(item, index) => `key-${index}`}
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity style={CommonStyles.itemView}
                                onPress={() => {
                                    if (item.status == bookDetails.status || bookDetails.status==20){
                                        props.navigation.navigate('SellerChatBoard', { item: item, bookDetails: bookDetails })
                                    }else{
                                        aleartOn('Already in conversation with other!');
                                    }
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text style={CommonStyles.font3Purple}>{item.userID.firstName + " " + item.userID.lastName}</Text>
                                    <Text style={CommonStyles.font1Black}>{item.userID.college+ ", " + item.userID.city}</Text>
                                    {
                                        statusDecoder(item.status) ?
                                            <Text style={CommonStyles.font1Purple}>{"Status: "}
                                                {
                                                     item.status == 20 || item.status == 40?
                                                        <Text style={{ ...CommonStyles.font1Purple, color: 'red' }}>{statusDecoder(item.status)}</Text>
                                                        :
                                                        item.status == 2 || item.status == 3 || item.status == 1?
                                                            <Text style={{ ...CommonStyles.font1Purple, color: 'orange' }}>{statusDecoder(item.status)}</Text>
                                                            :
                                                            <Text style={{ ...CommonStyles.font1Purple, color: 'green' }}>{statusDecoder(item.status)}</Text>

                                                }
                                            </Text>

                                            : null
                                    }   
                                </View>
                                <Image
                                    source={{ uri: item.userID.profileURL  }}
                                    style={CommonStyles.imageView1}
                                />
                            </TouchableOpacity>

                        }}
                    />
                    :
                    <View style={{ flex: 1, ...CommonStyles.centerAlignMent }}>
                        <Text style={CommonStyles.font2Purple}>Request Found</Text>
                    </View>
            }
           
        </View>
    )
}

const styles = StyleSheet.create({
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical:10* unit,
    },
})
