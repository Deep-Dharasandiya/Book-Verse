import React from 'react'
import {  Text, TouchableOpacity, View, Image, TextInput, FlatList,ActivityIndicator } from 'react-native'
//styles
import CommonStyles from '../../CommonStyles'
//utils
import Colors from '../../../constant/Colors'
import { unit } from '../../../constant/ScreenDetails'
import { fetchUploadedBook } from '../../../networkServices/AuthenticationServices'
import { rootContext } from '../../../context/store/ContextStore'
import {  addUserBook, clearUserBook } from '../../../context/actions/userBookAction'

export default function ShowUploadedPost(props) {
    const [search, setSearch] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const contextData = React.useContext(rootContext);

    React.useEffect(() => {
        fetchBooksData(true);
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
        fetchBooksData(false);
    }
    function onRefresh() {
        fetchBooksData(true);
    }
    function onChangeSearch(text) {
        setSearch(text);
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
                    style={{position:'absolute',marginHorizontal:10* unit,...CommonStyles.icon1Style}}
                    resizeMode="contain"
                    source={require('../../../assets/search/search.png')}
                />
               
            </View>
            {
                contextData.userBookReducerState.userBookData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())).length!=0?
                    <View style={{flex:1}}>
                        <FlatList
                            key={1}
                            data={contextData.userBookReducerState.userBookData.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))}
                            listMode="SCROLLVIEW"
                            onEndReachedThreshold={0.5}
                            onRefresh={() => onRefresh()}
                            refreshing={false}
                            onEndReached={() => onEndScroll()}
                            keyExtractor={(item, index) => `key-${index}`}
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity style={CommonStyles.itemView}
                                    onPress={() => props.navigation.navigate('ShowUploadedPostDetails', { item: item })}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={CommonStyles.font2Purple}>{item.title}</Text>
                                        <Text style={CommonStyles.font2Purple}>{item.price + " ₹"}</Text>
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
                                <Text style={CommonStyles.font2Purple}>No books Found</Text>
                                :
                                <ActivityIndicator />
                        }
                    </View>
            }
           

        </View>
    )
}