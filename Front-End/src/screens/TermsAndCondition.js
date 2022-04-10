import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
//styles
import CommonStyles from '../screens/CommonStyles'
//utils
import { unit } from '../constant/ScreenDetails'

export default function TermsAndCondition(props) {
    return (
        <View style={CommonStyles.containerPurple}>
            <View style={CommonStyles.headerView}>
                <TouchableOpacity
                    onPress={() => props.navigation.pop()}
                >
                    <Image
                        style={CommonStyles.icon1Style}
                        resizeMode="contain"
                        source={require('../assets/back/back.png')}
                    />
                </TouchableOpacity>
                <Text style={{ ...CommonStyles.font4White, marginLeft: 15 * unit }}>
                    Terms And Condition
                </Text>
            </View>
            <View style={CommonStyles.cardWhite}>
                <View style={CommonStyles.textView}>
                    <Text style={{ ...CommonStyles.font1Black, marginBottom: 10 * unit }}>
                        Terms And Condition Here.
                    </Text>
                </View>
            </View>
        </View>
    )
}

