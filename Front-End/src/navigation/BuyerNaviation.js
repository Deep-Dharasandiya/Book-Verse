import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
//Screens
import BuyerChatList from '../screens/AuthorizedScreen/Chat/Buyer/BuyerChatList';
import BuyerBookDetails from '../screens/AuthorizedScreen/Chat/Buyer/BuyerBookDetails';

export default function BuyerNaviation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatList" component={BuyerChatList} options={{ headerShown: false }} />
            <Stack.Screen name="BuyerBookDetails" component={BuyerBookDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
