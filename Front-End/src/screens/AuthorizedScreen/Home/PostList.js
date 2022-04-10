import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View ,Image,TextInput,FlatList,ActivityIndicator} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
//styles
import CommonStyles from '../../CommonStyles'
//utils
import Colors from '../../../constant/Colors'
import { unit} from '../../../constant/ScreenDetails'
import { fetchAllBook } from '../../../networkServices/AuthenticationServices'
import { rootContext } from '../../../context/store/ContextStore'
import { addBookPost } from '../../../context/actions/bookPostActions'
import MediaSelection from '../../../components/input/MediaSelection'
import { clearBookPost } from '../../../context/actions/bookPostActions'

export default function PostList(props) {
    const [search,setSearch] = React.useState('');
    const [filterFlag,setFilterFlag]=React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isCollegeOnly,setIsCollegeOnly]=React.useState(false)

    const contextData = React.useContext(rootContext);
    const currentUserID = contextData.commonReducerState.userDetails._id;

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                props.navigation.closeDrawer()
            };
        }, [])
    );
    React.useEffect(() => {
       if( contextData.bookPostReducerState.bookPostData.length==0){
           fetchBooksData(true);
       }
    }, [props.navigation]);
    let filterData = [ {
        value: 'College',
    }];
    function handleFilterFlag(flag){
        setFilterFlag(flag);
    }
    async function onChangeFilter(text){
        if (!isCollegeOnly){
            if (contextData.bookPostReducerState.bookPostData.filter((item) => item.userID.college == contextData.commonReducerState.userDetails.college).length==0){
                fetchBooksData();
            }
           setIsCollegeOnly(true);
        }else{
          setIsCollegeOnly(false);
        }
       
    }
    async function fetchBooksData(initial){
        setIsLoading(true);
        let date;
        let dataLength = contextData.bookPostReducerState.bookPostData.length;
        dataLength = contextData.bookPostReducerState.bookPostData.length;
        if (dataLength != 0  && !initial) {
            date = contextData.bookPostReducerState.bookPostData[dataLength-1].date;
        }else{
            date="current";
        }
        const body = {
            userID: contextData.commonReducerState.userDetails._id,
            city: contextData.commonReducerState.userDetails.city,
            college: '',
            date: date,
        }
        const response = await fetchAllBook(body);
        if (response) {
            if(initial){
                clearBookPost();
            }
            addBookPost(response);
        }
        setIsLoading(false);
    }
    function openDrawer(){
        props.navigation.openDrawer();
    }
    function onRefresh(){
        fetchBooksData(true);
    }
    function onEndScroll(){
        if (contextData.bookPostReducerState.bookPostData.length%20==0){
            fetchBooksData(false);
        }
       
    }
    function onChangeSearch(text){
        setSearch(text);
    }
    function checkForApplyed(requests){
        const len = requests.length;
        for(i=0;i<len;i++){
            if (requests[i].userID._id== currentUserID){
                return false;
            }
        }
        return true;
    }
    return (
        <View style={CommonStyles.containerBlurPurple}>
             <MediaSelection
                flag={filterFlag}
                lable="Sort By:"
                flagChange={handleFilterFlag}
                data={filterData}
                fn={onChangeFilter}
                isFilter={isCollegeOnly}
            /> 
            <View style={styles.appBar}>
              <View style={styles.appBarBody}>
                  <View style={{flexDirection:'row',...CommonStyles.centerAlignMent}}>
                        <TouchableOpacity
                            onPress={() => openDrawer()}
                        >
                            <Image
                                style={{...CommonStyles.icon1Style,marginLeft:15* unit}}
                                resizeMode="contain"
                                source={require('../../../assets/menu/menu.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{...CommonStyles.font4White,marginLeft:15* unit}}>Books</Text>
                  </View>
                    
                    <TouchableOpacity
                        onPress={() => handleFilterFlag(true)}
                    >
                         <Image
                            style={{...CommonStyles.icon1Style,marginRight:15* unit}}
                            resizeMode="contain"
                            source={require('../../../assets/sort/sort.png')}
                        /> 
                   </TouchableOpacity>
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
                        style={{position:'absolute',marginHorizontal:15* unit,...CommonStyles.icon1Style}}
                        resizeMode="contain"
                        source={require('../../../assets/search/search.png')}
                    />
                  
                </View>
            </View>
            {
                isCollegeOnly?
                    contextData.bookPostReducerState.bookPostData.filter((item) => (checkForApplyed(item.requests) && item.userID.college == contextData.commonReducerState.userDetails.college && item.title.toLowerCase().includes(search.toLowerCase()))).length!=0?
                    <View style={{flex:1}}>
                        <FlatList
                            key={1}
                                data={contextData.bookPostReducerState.bookPostData.filter((item) => (checkForApplyed(item.requests) && item.userID.college == contextData.commonReducerState.userDetails.college && item.title.toLowerCase().includes(search.toLowerCase())))}
                            listMode="SCROLLVIEW"
                            onEndReachedThreshold={0.5}
                            onRefresh={() => onRefresh()}
                            refreshing={false}
                            onEndReached={() => onEndScroll()}
                            keyExtractor={(item, index) => `key-${index}`}
                            ListFooterComponent={isLoading && (<ActivityIndicator />)}
                            ListFooterComponentStyle={{
                                marginVertical:10* unit,
                                width: '100%',
                                bottom: 0
                         }}
                        renderItem={({ item, index }) => {
                            return <View>
                            {
                            item.isDisplay &&(
                                <TouchableOpacity style={CommonStyles.itemView}
                                    onPress={() => props.navigation.navigate('PostDetails', { item: item })}
                                >
                                    <View style={{ flex: 1 }}>
                                        <Text style={CommonStyles.font2Purple}>{item.title}</Text>
                                        <Text style={CommonStyles.font1Black}>{item.userID.firstName + " " + item.userID.lastName + ", " + item.userID.college}</Text>
                                        <Text style={CommonStyles.font2Purple}>{item.price + " ₹"}</Text>
                                    </View>
                                    <Image
                                        source={{ uri: item.coverURL }}
                                        style={CommonStyles.imageView3}
                                    />
                                </TouchableOpacity>
                            )
                            }
                            </View>
                        }}
                    />
                </View>
                :
                <View style={{flex:1,...CommonStyles.centerAlignMent}}>
                    {
                        !isLoading ?
                            <Text style={CommonStyles.font2Purple}>No books Found</Text>
                        :
                        <ActivityIndicator/>
                    }
                </View>
                :
                    (contextData.bookPostReducerState.bookPostData).filter((item) => checkForApplyed(item.requests) &&  item.title.toLowerCase().includes(search.toLowerCase())).length != 0 ?
                        <View style={{ flex: 1 }}>
                            <FlatList
                                key={1}
                                data={contextData.bookPostReducerState.bookPostData.filter((item) => checkForApplyed(item.requests) && item.title.toLowerCase().includes(search.toLowerCase()))}
                                listMode="SCROLLVIEW"
                                onEndReachedThreshold={0.5}
                                onRefresh={() => onRefresh()}
                                refreshing={false}
                                onEndReached={() => onEndScroll()}
                                keyExtractor={(item, index) => `key-${index}`}
                                ListFooterComponent={isLoading && (<ActivityIndicator />)}
                                ListFooterComponentStyle={{
                                    marginVertical: 10 * unit,
                                    width: '100%',
                                    bottom: 0
                                }}
                                renderItem={({ item, index }) => {
                                    return <View>
                                        {
                                            item.isDisplay && (
                                                <TouchableOpacity style={CommonStyles.itemView}
                                                    onPress={() => props.navigation.navigate('PostDetails', { item: item })}
                                                >
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={CommonStyles.font2Purple}>{item.title}</Text>
                                                        <Text style={CommonStyles.font1Black}>{item.userID.firstName + " " + item.userID.lastName + ", " + item.userID.college}</Text>
                                                        <Text style={CommonStyles.font2Purple}>{item.price + " ₹"}</Text>
                                                    </View>
                                                    <Image
                                                        source={{ uri: item.coverURL }}
                                                        style={CommonStyles.imageView3}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                }}
                            />
                        </View>
                        :
                        <View style={{ flex: 1, ...CommonStyles.centerAlignMent }}>
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
    appBar:{
        backgroundColor:Colors.purple,
        justifyContent:'center',
        paddingVertical:10* unit,
    },
    appBarBody:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
})
