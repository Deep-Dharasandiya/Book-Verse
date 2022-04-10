import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//Screens
import SellerBookList from '../screens/AuthorizedScreen/Chat/Seller/SellerBookList';
import SellerChatList from '../screens/AuthorizedScreen/Chat/Seller/SellerChatList';
export default function SellerNaviation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BookList" component={SellerBookList} options={{ headerShown: false }} />
            <Stack.Screen name="SellerChatList" component={SellerChatList} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

