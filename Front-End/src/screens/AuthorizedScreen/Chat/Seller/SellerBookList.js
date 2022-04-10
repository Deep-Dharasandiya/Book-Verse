import React from 'react'
import { Text, TouchableOpacity, View, Image, TextInput, FlatList,ActivityIndicator } from 'react-native'
//style
import CommonStyles from '../../../CommonStyles'
//utils
import Colors from '../../../../constant/Colors'
import { unit } from '../../../../constant/ScreenDetails'
import { fetchUploadedBook } from '../../../../networkServices/AuthenticationServices'
import { rootContext } from '../../../../context/store/ContextStore'
import {  addUserBook, clearUserBook } from '../../../../context/actions/userBookAction'

export default function SellerBookList(props) {
    const [search, setSearch] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const contextData = React.useContext(rootContext);
    React.useEffect(() => {
        if (contextData.userBookReducerState.userBookData.length == 0) {
            fetchBooksData(true);
        }

    }, []);
    async function fetchBooksData(initial) {
        setIsLoading(true);
        let date;
        const dataLength = contextData.userBookReducerState.userBookData.length;
        if (dataLength != 0 && !initial) {
            date = contextData.userBookReducerState.userBookData[dataLength - 1].date;
        } else {
            date = "current";
        }
        const body = {
            userID: contextData.commonReducerState.userDetails._id,
            date: date,
        }
        const response = await fetchUploadedBook(body);
        if (response) {
            if (initial) {
                clearUserBook();
            }
            addUserBook(response);
        }
        setIsLoading(false);
    }
    function onEndScroll() {
        if (contextData.userBookReducerState.userBookData.length % 20 ==0){
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
            return "Awaiting buyer confirmation"
        } else if (status == 2) {
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
                    style={{position:'absolute',...CommonStyles.icon1Style,marginHorizontal:15* unit}}
                    resizeMode="contain"
                    source={require('../../../../assets/search/search.png')}
                />
            </View>
            {
                contextData.userBookReducerState.userBookData.filter((item) => item.requests.length != 0 && item.title.toLowerCase().includes(search.toLowerCase())).length != 0 ?
                    <View style={{flex:1}}>
                        <FlatList
                            key={1}
                            data={contextData.userBookReducerState.userBookData.filter((item) => item.requests.length != 0 && item.title.toLowerCase().includes(search.toLowerCase()))}
                            listMode="SCROLLVIEW"
                            onEndReachedThreshold={0.5}
                            onRefresh={() => onRefresh()}
                            refreshing={false}
                            onEndReached={() => onEndScroll()}
                            keyExtractor={(item, index) => `key-${index}`}
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity style={CommonStyles.itemView}
                                    onPress={() => props.navigation.navigate('SellerChatList', { item: item})}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={CommonStyles.font3Purple}>{item.title}</Text>
                                        <Text style={CommonStyles.font2Purple}>{ "₹ "+item.price }</Text>
                                        <Text style={CommonStyles.font1Black}>{"Total requests: " + item.requests.length}</Text>
                                        {
                                            statusDecoder(item.status) ?
                                                <Text style={CommonStyles.font1Purple}>{"Status: "}
                                                    {
                                                        item.status == 20 || item.status == 40?
                                                            <Text style={{ ...CommonStyles.font1Purple, color: 'red' }}>{statusDecoder(item.status)}</Text>
                                                            :
                                                            item.status == 2 || item.status == 3 || item.status == 1  ?
                                                                <Text style={{ ...CommonStyles.font1Purple, color: 'orange' }}>{statusDecoder(item.status)}</Text>
                                                                :
                                                                <Text style={{ ...CommonStyles.font1Purple, color: 'green' }}>{statusDecoder(item.status)}</Text>

                                                    }
                                                </Text>

                                                : null
                                        }   
                                    </View>
                                    <Image
                                        source={{ uri: item.coverURL }}
                                        style={CommonStyles.imageView3}
                                    />
                                </TouchableOpacity>
                            }}
                        />
                    </View>
                    :
                    <View style={{ flex: 1,...CommonStyles.centerAlignMent }}>
                        {
                            !isLoading ?
                                <Text style={CommonStyles.font2Purple}>Requested Book Note Found</Text>
                                :
                                <ActivityIndicator />
                        }
                </View>
            }
        </View>
    )
}