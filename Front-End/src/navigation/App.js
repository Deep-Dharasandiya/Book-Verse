import React from 'react'
import { StatusBar,Platform} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//utils
import ContextStore from '../context/store/ContextStore';
import { rootContext } from '../context/store/ContextStore';
import Loader from '../components/Loader';
import { getBookPost, getBuyerBook, getChat, getCommanReducer, getUserBook} from '../context/localStorage/LocalStorage';
import Aleart from '../components/Aleart';
import Toast from '../components/Toast';
import { handleNotificationData } from '../..';

//Screen unathorized
import LandingScreen from '../screens/LandingScreen'
import Login from '../screens/Login';
import FAQ from '../screens/FAQ';
import Register1 from '../screens/Register/Register1';
import Register2 from '../screens/Register/Register2';
import Register3 from '../screens/Register/Register3';
import ForgotPassword1 from '../screens/forgotPassword/ForgotPassword1';
import ForgotPassword2 from '../screens/forgotPassword/ForgotPassword2';
import ForgotPassword3 from '../screens/forgotPassword/ForgotPassword3';
import TermsAndCondition from '../screens/TermsAndCondition';
import PrivacyPolicy from '../screens/PrivacyPolicy';

//Screen athorized
import BottomTabNavigation from './BottomTabNavigation';
import ProfileDetails from '../screens/AuthorizedScreen/ProfileDetails';
import SellerChatBoard from '../screens/AuthorizedScreen/Chat/Seller/SellerChatBoard';
import BuyerChatBoard from '../screens/AuthorizedScreen/Chat/Buyer/BuyerChatBoard';
import SoldHistory from '../screens/AuthorizedScreen/SoldHistory';
import SoldHistoryDetails from '../screens/AuthorizedScreen/SoldHistoryDetails';
import PurchaseHistory from '../screens/AuthorizedScreen/PurchaseHistory';
import PurchaseHistoryDetails from '../screens/AuthorizedScreen/PurchaseHistoryDetails';


export default function App(props) {
  const [isLoad, setIsLoad] = React.useState(false);
  async function getInitialDetails(){
    await getBookPost();
    await getCommanReducer();
    await getUserBook();
    await getBuyerBook();
    await getChat();
    const temp = JSON.parse(await AsyncStorage.getItem('notification'));
    if(temp){
      for (i = 0; i < temp.length; i++) {
        await handleNotificationData(temp[i]);
      }
    }
    await AsyncStorage.setItem('notification', JSON.stringify([]));
    setIsLoad(true);
  }
  React.useEffect( () => {
    getInitialDetails();
    StatusBar.setBarStyle('dark-content', true);
  }, []);
  return (
    <ContextStore>
    <SafeAreaProvider>
      {
        isLoad &&(
            <AllScreens />
        )
      }
    </SafeAreaProvider>
    </ContextStore>
  
  )
}
function AllScreens(){
  const data = React.useContext(rootContext);
  return(
    <NavigationContainer>
      <Loader
        isVisible={data.commonReducerState.isLoading}
      />
      <StatusBar 
        barStyle="light-content"
        backgroundColor={'#A134F8'}
       />
      <Aleart/>
      <Toast/>
      <Stack.Navigator>
        
    {
          data.commonReducerState.isLogin?
        <>
            <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{ headerShown: false }} />
              <Stack.Screen name="ProfileDetails" component={ProfileDetails} options={{ headerShown: false }} />
              <Stack.Screen name="SellerChatBoard" component={SellerChatBoard} options={{ headerShown: false }} />
              <Stack.Screen name="BuyerChatBoard" component={BuyerChatBoard} options={{ headerShown: false }} />
              <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} options={{ headerShown: false }} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
              <Stack.Screen name="SoldHistory" component={SoldHistory} options={{ headerShown: false }} />
              <Stack.Screen name="SoldHistoryDetails" component={SoldHistoryDetails} options={{ headerShown: false }} />
              <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} options={{ headerShown: false }} />
              <Stack.Screen name="PurchaseHistoryDetails" component={PurchaseHistoryDetails} options={{ headerShown: false }} />
        </>
        :
        <>
            <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="FAQ" component={FAQ} options={{ headerShown: false }} />
            <Stack.Screen name="Register1" component={Register1} options={{ headerShown: false }} />
            <Stack.Screen name="Register2" component={Register2} options={{ headerShown: false }} />
            <Stack.Screen name="Register3" component={Register3} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword1" component={ForgotPassword1} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword3" component={ForgotPassword3} options={{ headerShown: false }} />
            <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} options={{ headerShown: false }} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
        </>
    }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
