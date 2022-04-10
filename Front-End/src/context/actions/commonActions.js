import { dispatch } from "../store/ContextStore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeCommanReducer } from "../localStorage/LocalStorage"; 
import { Local_Srorage, Comman_Actions } from "../../constant/actionType";

export function setcommonReducerState(data) {
    dispatch.commonReducerDispatch({
        type: Local_Srorage.SET_COMMAN_REDUCER,
        payload: data,
    });
}

export async function setFCMToken(data) {
    await dispatch.commonReducerDispatch({
        type: Comman_Actions.SET_FCM_TOKEN,
        payload: data,
    });
    storeCommanReducer();
}

export async function setLogin(data) {
   await dispatch.commonReducerDispatch({ 
        type: Comman_Actions.SET_LOGIN ,
        payload:data,
    });
    storeCommanReducer();
}
export async function setLogout(data) {
    await AsyncStorage.clear();
    await dispatch.commonReducerDispatch({
        type: Comman_Actions.SET_LOGOUT,
        payload: data,
    });
    storeCommanReducer();
}
export async function loadingStart(data) {
    await dispatch.commonReducerDispatch({
        type: Comman_Actions.LOADIND_START,
        payload: data,
    });
}
export async function loadingOff(data) {
    await dispatch.commonReducerDispatch({
        type: Comman_Actions.LOADING_OFF,
        payload: data,
    });
}
export async function aleartOn(data) {
    await dispatch.commonReducerDispatch({
        type: Comman_Actions.ALEART_ON,
        payload: data,
    });
}
export async function aleartOff(data) {
    await dispatch.commonReducerDispatch({
        type: Comman_Actions.ALEART_OFF,
        payload: data,
    });
}
export async function toastOn(data) {
    await dispatch.commonReducerDispatch({
        type: Comman_Actions.TOAST_ON,
        payload: data,
    });
    timer();
    
}
export async function toastOff(data) {
    await dispatch.commonReducerDispatch({
        type: Comman_Actions.TOAST_OFF,
        payload: data,
    });
    clearTimeout(myTimeout);
}

let myTimeout;
function timer(){
    myTimeout = setTimeout(toastOff, 3000);
}
