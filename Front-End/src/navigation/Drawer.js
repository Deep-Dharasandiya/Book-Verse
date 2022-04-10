import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text,Image} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
const drawer = createDrawerNavigator();
//style
import CommonStyles from '../screens/CommonStyles';
//utils
import Colors from '../constant/Colors';
import { unit, width } from '../constant/ScreenDetails';
import HomeNavigation from './HomeNavigation';
import { rootContext } from '../context/store/ContextStore';
import { logout } from '../networkServices/AuthenticationServices';
import { setLogout } from '../context/actions/commonActions';
import { clearBookPost } from '../context/actions/bookPostActions';
import { clearBuyerBook } from '../context/actions/buyerBookActions';
import { clearUserBook } from '../context/actions/userBookAction'
import { clearChats } from '../context/actions/chatActions';

export default function Drawer(props) {
   
    return (
        <drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: Colors.blurPurple,
                drawerActiveTintColor: Colors.purple,
                drawerInactiveTintColor: Colors.black,
                drawerLabelStyle: {
                    marginLeft: -20 *unit,
                    fontSize: 15 * unit,
                }
            }}
        >
            <drawer.Screen
                name="home"
                component={HomeNavigation}
            />
        </drawer.Navigator>
    )
}

function CustomDrawer(props) {
    const data = React.useContext(rootContext);
    const currentUserID = data.commonReducerState.userDetails._id;
    async function onLogout() {
        const body={
            id: currentUserID
        }
        const response = await logout(body);
        if (response) {
            if (response.isLogout) {
                setLogout();
                clearBookPost();
                clearBuyerBook();
                clearUserBook();
                clearChats();
            }
        }
    }
    return (
        <View style={CommonStyles.containerBlurPurple}>
            <View style={styles.logoView}>
                <Text style={styles.title}>BookVerse</Text>
                <View style={styles.profileView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: data.commonReducerState.userDetails.profileURL }}
                            style={styles.profileImage}
                        />
                        <View style={{ flex: 0.9 }}>
                            <Text style={CommonStyles.font1White}>{data.commonReducerState.userDetails.firstName + ' ' + data.commonReducerState.userDetails.lastName}</Text>
                            <Text style={{ ...CommonStyles.font1White, fontSize: 10 * unit }}>{data.commonReducerState.userDetails.college + ', ' + data.commonReducerState.userDetails.city}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => onLogout()}
                    >
                        <Image
                            style={{height:25* unit,width:25* unit, marginRight: 20 * unit }}
                            resizeMode="contain"
                            source={require('../assets/logout/logout.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <DrawerContentScrollView
                {...props}
            >
              
                <TouchableOpacity style={styles.listItemView}
                    onPress={() => props.navigation.navigate("ProfileDetails")}
                >
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/account/account.png')}
                    />
                    <Text style={{...CommonStyles.font2Black,fontWeight:'300'}}>
                        View Account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItemView}
                    onPress={() => props.navigation.navigate("PurchaseHistory")}
                >
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/purchase/purchase.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                        Purchases
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItemView}
                    onPress={() => props.navigation.navigate("SoldHistory")}
                >
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/soldhistory/soldhistory.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                        Sold Books
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItemView}
                    onPress={() => props.navigation.navigate('PrivacyPolicy')}
                >
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/pp/pp.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                       Privacy Policy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItemView} 
                    onPress={() => props.navigation.navigate('TermsAndCondition')}
                >
                    <Image
                        style={{ ...CommonStyles.icon1Style, marginRight: 10 * unit }}
                        resizeMode="contain"
                        source={require('../assets/tc/tc.png')}
                    />
                    <Text style={{ ...CommonStyles.font2Black, fontWeight: '300' }}>
                        Terms and Conditions
                    </Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
            <View style={styles.logoutView}>
                <Text style={{...CommonStyles.font2Purple,fontWeight:'500'}}>Created By</Text>
                <Text style={{...CommonStyles.font1Black,fontWeight:'300'}}>Jay, Deep and Kuldip</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    title:{
        ...CommonStyles.font4White, 
        fontSize: 45 * unit, 
        alignSelf: 'flex-start'
    },
    logoView: {
        paddingBottom:10* unit,
        backgroundColor: Colors.purple,
        paddingHorizontal:8* unit
    },
    profileView:{
        flexDirection: 'row', 
        marginTop: 40 * unit, 
        alignItems: 'center' 
    },
    profileImage:{
        height: width * 0.07, 
        width: width * 0.07, 
        borderRadius: width * 0.035, 
        marginRight: 10 * unit 
    },
    logoutView: {
        marginBottom:  30 * unit,
        marginTop: 15 * unit,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        marginLeft: 10 * unit,
        fontSize: 20 * unit,
        color: Colors.purple,
        fontWeight: '600'
    },
    listItemView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        height: 50 * unit, 
        paddingHorizontal: 10 * unit 
    }
})

