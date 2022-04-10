
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
//style
import CommonStyles from '../screens/CommonStyles';
//utils
import Colors from '../constant/Colors';
import { width, unit } from '../constant/ScreenDetails';
//Screens
import BuyerNaviation from './BuyerNaviation';
import SellerNaviation from './SellerNavigation';

export default function ChatNavigation() {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}  >
            <Tab.Screen name="To Buy" component={BuyerNaviation} options={{ headerShown: false }} />
            <Tab.Screen name="For Sell" component={SellerNaviation} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}
function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ backgroundColor: Colors.purple }}>
            <Text style={{...CommonStyles.font4White, marginLeft: 10 * unit, marginVertical: 10 * unit }}>Conversations</Text>
        <View style={styles.topTab}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

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
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        key={label}
                        onLongPress={onLongPress}
                    >
                        <View style={{ ...styles.btnView, borderBottomWidth: isFocused ? 3 : 0 }}>
                            <Text style={{ color: isFocused ? Colors.white : "#6C0BA9", fontSize: 20 * unit, fontWeight: isFocused ? '600' : '400' }}>
                                {label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topTab: {
        flexDirection: 'row',
        height: 50 * unit,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    btnView: {
        width: width * 0.5,
        height: 50 * unit,
        alignItems: 'center',
        borderColor: Colors.white,
        justifyContent: 'center'
    }
})
