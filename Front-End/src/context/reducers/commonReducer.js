import { Local_Srorage, Comman_Actions } from "../../constant/actionType";
export const commonReducerInitialState={
    isLogin:false,
    isLoading:false,
    isAleart:false,
    aleartMessage:'wdfef',
    isToast:false,
    toastMessage:'',
    fcmToken:'',
    userDetails:{},
}

export default function commonReducer(state = commonReducerState, action) {
   switch(action.type){
       case Local_Srorage.SET_COMMAN_REDUCER:
           return {
               isLogin: action.payload.isLogin,
               isLoading: action.payload.isLoading,
               isAleart: action.payload.isAleart,
               fcmToken: action.payload.fcmToken,
               userDetails: action.payload.userDetails
           }
       case Comman_Actions.SET_FCM_TOKEN:
           return {
               ...state,
               fcmToken: action.payload,
           }
       case Comman_Actions.SET_LOGIN:
           return {
               ...state,
               userDetails:action.payload,
               isLogin: true,
        }
       case Comman_Actions.SET_LOGOUT:
           return {
               ...state,
               userDetails:[],
               isLogin: false,
               fcmToken:''
           }
       case Comman_Actions.LOADIND_START:
           return {
               ...state,
               isLoading: true,
        }
       case Comman_Actions.LOADING_OFF:
           return {
               ...state,
               isLoading: false,
           }
       case Comman_Actions.ALEART_ON:
           return {
               ...state,
               aleartMessage: action.payload,
               isAleart: true,
           }
       case Comman_Actions.ALEART_OFF:
           return {
               ...state,
               isAleart: false,
               aleartMessage:'',
           }
       case Comman_Actions.TOAST_ON:
           return {
               ...state,
               isToast: true,
               toastMessage: action.payload,
           }
       case Comman_Actions.TOAST_OFF:
           return {
               ...state,
               isToast: false,
               aleartMessage: '',
           }
        default:{
            return state;
        }
   }
}
