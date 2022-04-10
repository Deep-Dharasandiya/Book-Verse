import { StyleSheet } from 'react-native';
import Colors from '../constant/Colors';
import { unit,width,height } from '../constant/ScreenDetails';

const CommonStyles = StyleSheet.create({
    //MainContainer
    containerWhite:{
        flex:1,
        backgroundColor:Colors.white,
    },
    containerPurple: {
        flex: 1,
        backgroundColor: Colors.purple,
    },
    containerBlurPurple: {
        flex: 1,
        backgroundColor: Colors.blurPurple,
    },
    //Card
    cardWhite: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 40 * unit,
        borderTopLeftRadius: 40 * unit,
        marginTop:height*0.03,
    },
    //HaderView and instruction text view of unAuthorize Screen
    headerView: {
        flexDirection: 'row',
        marginTop: 60 * unit,
        alignItems: 'center',
        width: width * 0.85,
        alignSelf: 'center'
    },
    textView: {
        width: width * 0.85,
        alignSelf: 'center',
        marginTop: 20 * unit
    },
    // Font Style
    font1Black:{
        fontSize:15* unit,
        color:Colors.black
    },
    font1Purple: {
        fontSize: 15 * unit,
        color: Colors.purple
    },
    font1White: {
        fontSize: 15 * unit,
        color: Colors.white
    },
    font2Black:{
        fontSize: 18 * unit,
        color: Colors.black
    },
    font2Purple: {
        fontSize: 18 * unit,
        color: Colors.purple,
    },
    font2White: {
        fontSize: 18 * unit,
        color: Colors.white,
    },
    font3White:{
        fontSize: 20 * unit,
        color: Colors.white,
        fontWeight:'600'
    },
    font3Purple: {
        fontSize: 20 * unit,
        color: Colors.purple,
        fontWeight: '400'
    },
    font4White: {
        fontSize: 25 * unit,
        color: Colors.white,
        fontWeight: '600'
    },
    font4Purple: {
        fontSize: 25 * unit,
        color: Colors.purple,
        fontWeight: '600'
    },
    underLineFontPurple: {
        fontSize: 15 * unit,
        color: Colors.purple,
        textDecorationLine: 'underline',
    },
    //Icon Style
    icon1Style:{
        height:20* unit,
        width:20* unit
    },
    icon2Style: {
        height: 40 * unit,
        width: 40 * unit
    },
    //alignMent
    centerAlignMent:{
        alignItems:'center',
        justifyContent:'center'
    },
    //bottom View style of LandingScreen and LoginScreen

     LoginLandingBottomView: {
        position: 'absolute',
        left: 0,
        bottom: 20* unit,
         width: width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    //App Logo style

    VerticalLogo: {
        alignSelf: 'center',
        width: width * 0.65,
        height: (width * 0.65) / 1.38356
    },
    HorizontalLogo: {
        alignSelf: 'center',
        width: width * 0.65,
        height: (width * 0.65) / 3.5625
    },
    //image Veiw
    imageView0: {
        height: 50 * unit,
        width: 50 * unit,
        borderRadius: 25 * unit,
        borderWidth: 1,
        borderColor: Colors.purple,
    },
    imageView1: {
        height: 100 * unit,
        width: 100 * unit,
        borderRadius: 50 * unit,
        borderWidth: 1,
        borderColor: Colors.purple,
    },
    imageView2:{
        height: 150 * unit,
        width: 150* unit,
        borderRadius: 75 * unit,
        borderWidth: 1,
        borderColor: Colors.purple,
    },
    imageView3: {
        height: 100 * unit,
        width: 80 * unit,
        borderRadius: 10 * unit,
        borderColor: Colors.purple,
        borderWidth: 1,
    },
    imageView4: {
        width: width * 0.4,
        height: width * 0.5,
        borderRadius: 10 * unit,
        borderWidth: 1,
        borderColor: Colors.purple,
        alignSelf: 'center'
    },
    //Search View
     searchView: {
        width: width * 0.96,
        height: 50 * unit,
        borderRadius: 10 * unit,
        borderColor: Colors.purple,
        backgroundColor: Colors.white,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 15 * unit,
        paddingRight: 10 * unit,
        paddingLeft: 40 * unit,
        justifyContent: 'center',
    },
    searchTextInput: {
        color: Colors.black,
        fontSize: 15 * unit,
        paddingVertical: 10 * unit,
        height: 50 * unit,
    },
    //Book Item Display View
    itemView: {
        width: width,
        borderBottomWidth: 1,
        borderColor: Colors.purple,
        paddingHorizontal: 15 * unit,
        alignSelf: 'center',
        paddingVertical: 10 * unit,
        flexDirection: 'row',
        alignItems: 'center',
    },
});


export default CommonStyles;