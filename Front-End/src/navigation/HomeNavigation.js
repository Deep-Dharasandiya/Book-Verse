import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//Screens
import PostList from '../screens/AuthorizedScreen/Home/PostList';
import PostDetails from '../screens/AuthorizedScreen/Home/PostDetails';


export default function HomeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PostList" component={PostList} options={{ headerShown: false }} />
            <Stack.Screen name="PostDetails" component={PostDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
