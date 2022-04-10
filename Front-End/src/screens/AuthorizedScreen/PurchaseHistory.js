import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList, ActivityIndicator } from 'react-native'
//styles
import CommonStyles from '../CommonStyles'
//utils
import Colors from '../../constant/Colors'
import { unit } from '../../constant/ScreenDetails'
import { GetPurchaseHistoryt } from '../../networkServices/AuthenticationServices'
import { rootContext } from '../../context/store/ContextStore'


export default function PurchaseHistory(props) {
    const [search, setSearch] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [history, setHistory] = React.useState([]);
    
    const contextData = React.useContext(rootContext);
    const currentUserID = contextData.commonReducerState.userDetails._id;
    React.useEffect(() => {
        fetchSoldHistory();
    }, []);


    async function fetchSoldHistory() {
        setIsLoading(true);
        const body = {
            userID: currentUserID,
        }
        const response = await GetPurchaseHistoryt(body);
        if (response) {
            setHistory(response)
        }
        setIsLoading(false);
    }

    function onRefresh() {
        fetchBooksData();
    }
    function onChangeSearch(text) {
        setSearch(text);
    }
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.appBar}>
                <View style={styles.appBarBody}>
                    <View style={{ flexDirection: 'row', ...CommonStyles.centerAlignMent }}>
                        <TouchableOpacity
                            onPress={() => props.navigation.pop()}
                        >
                            <Image
                                style={{ ...CommonStyles.icon1Style, marginLeft: 15 * unit }}
                                resizeMode="contain"
                                source={require('../../assets/back/back.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{ ...CommonStyles.font4White, marginLeft: 15 * unit }}>Purchased Books</Text>
                    </View>
                </View>
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
                        style={{ position: 'absolute', marginHorizontal: 15 * unit, ...CommonStyles.icon1Style }}
                        resizeMode="contain"
                        source={require('../../assets/search/search.png')}
                    />

                </View>
            </View>
            {!isLoading ?
                <View style={{ flex: 1 }}>
                    {
                        history.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())).length != 0 ?
                            <FlatList
                                key={1}
                                data={history.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))}
                                listMode="SCROLLVIEW"
                                onRefresh={() => onRefresh()}
                                refreshing={false}
                                keyExtractor={(item, index) => `key-${index}`}
                                ListFooterComponent={isLoading && (<ActivityIndicator />)}
                                ListFooterComponentStyle={{
                                    marginVertical: 10 * unit,
                                    width: '100%',
                                    bottom: 0
                                }}
                                renderItem={({ item, index }) => {
                                    return <View>
                                        <TouchableOpacity style={CommonStyles.itemView}
                                            onPress={() => props.navigation.navigate('PurchaseHistoryDetails', { item: item })}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text style={CommonStyles.font2Purple}>{item.title}</Text>
                                                <Text style={CommonStyles.font1Black}>{"Buyer: " + item.buyerID.firstName + " " + item.buyerID.lastName}</Text>
                                                <Text style={CommonStyles.font2Purple}>{item.price + " ₹"}</Text>
                                            </View>
                                            <Image
                                            source={{ uri: item.coverURL }}
                                            style={CommonStyles.imageView3}
                                        />
                                        </TouchableOpacity>
                                    </View>
                                }}
                            />
                            :
                            <View style={{ flex: 1, ...CommonStyles.centerAlignMent }}>
                                <Text style={CommonStyles.font2Purple}>No books Found</Text>
                            </View>
                    }

                </View>
                :
                <View style={{ flex: 1, ...CommonStyles.centerAlignMent }}>
                    <ActivityIndicator />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    appBar: {
        backgroundColor: Colors.purple,
        justifyContent: 'center',
        paddingVertical: 10 * unit,
    },
    appBarBody: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
})
