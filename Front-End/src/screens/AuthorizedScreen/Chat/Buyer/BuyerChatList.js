import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList, ActivityIndicator } from 'react-native'
//styles
import CommonStyles from '../../../CommonStyles'
//utils
import Colors from '../../../../constant/Colors'
import { unit } from '../../../../constant/ScreenDetails'
import { fetchBuyerBook } from '../../../../networkServices/AuthenticationServices'
import { rootContext } from '../../../../context/store/ContextStore'
import { addBuyerBook, clearBuyerBook } from '../../../../context/actions/buyerBookActions'
export default function BuyerChatList(props) {
    const [search, setSearch] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const contextData = React.useContext(rootContext);
    React.useEffect(() => {
        if (contextData.buyerBookReducerState.buyerBookData.length == 0) {
            fetchBooksData(true);
        }
    }, []);
    async function fetchBooksData(initial) {
        setIsLoading(true);
        let date;
        const dataLength = contextData.buyerBookReducerState.buyerBookData.length;
        if (dataLength != 0 && !initial) {
            date = contextData.buyerBookReducerState.buyerBookData[dataLength - 1].date;
        } else {
            date = "current";
        }
        const body = {
            userID: contextData.commonReducerState.userDetails._id,
            date: date,
        }
        const response = await fetchBuyerBook(body);
        if (response) {
            if (initial) {
                clearBuyerBook();
            }
            addBuyerBook(response);
        }
        setIsLoading(false);
    }
    function onEndScroll() {
        if (contextData.buyerBookReducerState.buyerBookData.length %20 ==0){
            fetchBooksData(false);
        }
    }
    function onRefresh() {
        fetchBooksData(true);
    }
    function onChangeSearch(text) {
        setSearch(text);
    }
    function statusDecoder(status) {
        if (status == 0) {
            return "";
        } else if (status == 1) {
            return "Awaiting your confirmation"
        } else if (status == 2) {
            return "Deal finalized, awaiting delivery"
        } else if (status == 20) {
            return ""
        }
        else if (status == 3) {
            return "Delivered by seller" 
        }
        else if (status == 4) {
            return "Book received" 
        } else if (status == 40) {
            return 'Deal finalized, awaiting delivery'
        } else {
            return "Deal finalized with other"
        }
    }

    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={CommonStyles.searchView}>
                <TextInput
                    style={CommonStyles.searchTextInput}
                    placeholder={"Search By Book's Name"}
                    fontSize={15 * unit}
                    placeholderTextColor={Colors.gray}
                    onChangeText={text => onChangeSearch(text)}
                    defaultValue={search}
                />
                <Image
                    style={{position:'absolute',...CommonStyles.icon1Style,marginHorizontal:10* unit}}
                    resizeMode="contain"
                    source={require('../../../../assets/search/search.png')}
                />
            </View>
             {
                contextData.buyerBookReducerState.buyerBookData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())).length != 0 && contextData.commonReducerState.userDetails._id ?
                    <View style={{flex:1}}>

                        <FlatList
                            key={1}
                            data={contextData.buyerBookReducerState.buyerBookData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))}
                            listMode="SCROLLVIEW"
                            onEndReachedThreshold={0.5}
                            onRefresh={() => onRefresh()}
                            refreshing={false}
                            onEndReached={() => onEndScroll()}
                            keyExtractor={(item, index) => `key-${index}`}
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity style={CommonStyles.itemView}
                                    onPress={() => props.navigation.navigate('BuyerBookDetails', { item: item })}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={CommonStyles.font2Purple}>{item.title}</Text>
                                        <Text style={CommonStyles.font2Purple}>{item.price + " ₹"}</Text>
                                        <Text style={CommonStyles.font1Black}>{"Other requests: " + (item.requests.length-1)}</Text>
                                        {
                                            item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id).length!=0 &&(
                                            statusDecoder(item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id)[0].status)!='' &&(
                                                <Text style={CommonStyles.font1Purple}>{"Status: "}
                                                    {
                                                        (item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id)[0].status == 1 || item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id)[0].status == 6) ?
                                                            <Text style={{ ...CommonStyles.font1Purple, color: 'red' }}>{statusDecoder(item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id)[0].status)}</Text>
                                                        :
                                                            (item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id)[0].status == 2 || item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id)[0].status == 40) ?
                                                                <Text style={{ ...CommonStyles.font1Purple, color: 'orange' }}>{statusDecoder(item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id)[0].status)}</Text>
                                                            :
                                                                <Text style={{ ...CommonStyles.font1Purple, color: 'green' }}>{statusDecoder(item.requests.filter((i) => i.userID._id == contextData.commonReducerState.userDetails._id)[0].status)}</Text>
                                                    }
                                                </Text>

                                            )
                                            )
                                        }   
                                    </View>
                                        
                                    <TouchableOpacity
                                      style={styles.chatButton}
                                        onPress={() => props.navigation.navigate('BuyerChatBoard', {item:item})}
                                    >
                                        <Text style={CommonStyles.font2White}>Let's Chat</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>

                            }}
                        />
                    </View>
                    :
                    <View style={{ flex: 1,...CommonStyles.centerAlignMent}}>
                        {
                            !isLoading ?
                                <Text style={CommonStyles.font2Purple}>No books Found</Text>
                                :
                                <ActivityIndicator />
                        }
                    </View>
            } 


        </View>
    )
}
const styles = StyleSheet.create({
    chatButton:{
     padding:10* unit,
     backgroundColor:Colors.purple,
     borderRadius:10* unit,
     ...CommonStyles.centerAlignMent
    }
})