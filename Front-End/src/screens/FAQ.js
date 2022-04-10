import React from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity,FlatList} from 'react-native'
//styles
import CommonStyles from './CommonStyles'
//utils
import Colors from '../constant/Colors'
import {unit,width,height } from '../constant/ScreenDetails'

export default function FAQ(props) {
    const [isShow , setIsShow] = React.useState([]);
    function openClose(index){
        if (isShow.filter((i) => i == (index + 1)) == index + 1){
            setIsShow(isShow.filter(item => item !== index+1));
        }else{
            setIsShow([...isShow, index + 1]);
        }
    }
    const faqData=[
        {
            que:"What is BookVerse ?",
            ans:"It is a platform where you can share the college books and notes that you no longer want and the juniors can easily buy them from the platform."
        },
        {
            que: "What can I use BookVerse For ?",
            ans: "You can search for your subject books if you want to buy them.\nIf you want to share your unwanted subject books/ notes, then you can sell them on the platform."
        },
        {
            que: "Would the platform deduct any commission for selling books ?",
            ans: "No, this platform allows students to sell their books without any kind of commission."
        },
        {
            que: "We can sell or buy books accross what region ?",
            ans: "You can buy or sell books from the students studying in the colleges that are in your city."
        },
    ]
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
                <Text style={{...CommonStyles.font3White,marginLeft:15* unit}}>
                    Frequently Asked Questions
                </Text>
            </View>
            <View style={{...CommonStyles.cardWhite,paddingHorizontal:width*0.075}}>
                <FlatList
                    key={1}
                    data={faqData}
                    listMode="SCROLLVIEW"
                    keyExtractor={(iem, index) => `key-${index}`}
                    ListHeaderComponent={() => (
                        <Text style={{...CommonStyles.font1Black,marginVertical:15*unit}}>
                            Wondering how BookVerse works? We have put together a list of all our  most frequetly asked questions.
                        </Text>
                    )}
                    renderItem={({ item ,index}) => {
                        return <View style={{ marginBottom: 10 * unit,}}>
                            <TouchableOpacity 
                                style={styles.itemView}
                                onPress={()=>openClose(index)}
                            >
                            <Text>{item.que}</Text>
                                <Image
                                    style={{position:'absolute',right:15* unit,...CommonStyles.icon1Style}}
                                    resizeMode="contain"
                                    source={isShow.filter((i) => i == (index + 1)) == index + 1 ? require('../assets/close/close.png') : require('../assets/more/more.png')}
                                />
                            </TouchableOpacity>
                            {
                                (isShow.filter((i)=>i==(index+1))==index+1) &&(
                                    <View style={{...styles.itemView,backgroundColor:Colors.white}}>
                                        <Text>{item.ans}</Text>
                                    </View>
                                )
                            }
                           
                    </View>
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemView:{
        width:width*0.85,
        alignSelf:'center',
        padding:12 * unit,
        paddingRight:40 * unit,
        backgroundColor:Colors.blurPurple,
        borderRadius:10 * unit,
        justifyContent:'center',
    },
})
