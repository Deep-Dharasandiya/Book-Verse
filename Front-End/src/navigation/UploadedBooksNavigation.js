import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//Screens
import ShowUploadedPost from '../screens/AuthorizedScreen/Upload/ShowUploadedPost'
import ShowUploadedPostDetails from '../screens/AuthorizedScreen/Upload/ShowUploadedPostDetails';


export default function UploadedBooksNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ShowUploadedPost" component={ShowUploadedPost} options={{ headerShown: false }} />
            <Stack.Screen name="ShowUploadedPostDetails" component={ShowUploadedPostDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}
