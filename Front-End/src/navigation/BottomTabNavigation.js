import React from "react";
import {StyleSheet,View, TouchableOpacity,Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
//utils
import Colors from "../constant/Colors";
import { unit } from "../constant/ScreenDetails";
//Screens
import UploadNavigation from "./UploadNavigation";
import ChatNavigation from "./ChatNavigation";
import Drawer from './Drawer';

export default function BottomTabNavigation(props) {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
    return (
      <Tab.Navigator
        screenOptions={{
          "tabBarHideOnKeyboard": "true",
        }}
      initialRouteName="home"
      tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Home" component={Drawer} options={{headerShown:false}}/>
        <Tab.Screen name="Upload Book" component={UploadNavigation} options={{ headerShown: false }}/>
        <Tab.Screen name="Chat" component={ChatNavigation} options={{ headerShown: false }}/>
    </Tab.Navigator>
    )
}


function MyTabBar({state, descriptors, navigation,props}) {
  return (
    <View style={{backgroundColor:Colors.blurPurple}}>
    <View style={styles.tabBar}>

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const iconActive = {
          Home: require('../assets/homeActive/homeActive.png'),
          UploadBook:require('../assets/uploadActive/uploadActive.png'),
          Chat: require('../assets/chatActive/chatActive.png'),
        };
        const iconDeactive = {
          Home: require('../assets/homeDeactive/home.png'),
          UploadBook: require('../assets/uploadDeactive/upload.png'),
          Chat: require('../assets/chatDeactive/chat.png'),
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1}}>

            <View style={{ alignItems: 'center'}}>
              {
                isFocused?
                    <Image
                    style={styles.tabIcon}
                      source={iconActive[label.replace(" ","")]}
                    />
          
                  :
                  <Image
                    style={styles.tabIcon}
                    source={iconDeactive[label.replace(" ", "")]}
                  />
              }
              
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 55*unit,
    paddingTop:5* unit,
    alignItems: 'center',
    paddingHorizontal: 5 * unit,
    borderRadius:10*unit,
    marginBottom:8* unit,
    marginHorizontal:8* unit,
    marginTop:4* unit,
    backgroundColor: Colors.purple,
  },
  tabIcon: {
    height: 23 * unit, 
    width: 23 * unit,
  }
})