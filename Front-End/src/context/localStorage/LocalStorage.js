import AsyncStorage from '@react-native-async-storage/async-storage';
import { state } from '../store/ContextStore';
import { loadingOff, setcommonReducerState, toastOff } from '../actions/commonActions';
import { setBookPost } from '../actions/bookPostActions';
import {  addUserBook } from '../actions/userBookAction';
import { setBuyerBook } from '../actions/buyerBookActions';
import { setChat } from '../actions/chatActions';
export async function storeCommanReducer(){
    try {
        await AsyncStorage.setItem('COMMON_REDUCER', JSON.stringify(state.commonReducerState));
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false;
    }
}
export async function getCommanReducer() {
    try {
        const temp = await AsyncStorage.getItem('COMMON_REDUCER')
        if (temp) {
            setcommonReducerState(JSON.parse(temp));
            loadingOff();
            toastOff();
        }
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false; s
    }
}
export async function storeBookPost() {
    try {
        await AsyncStorage.setItem('BOOK_POST', JSON.stringify(state.bookPostReducerState.bookPostData));
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false;
    }
}

export async function getBookPost() {
    try {
        const temp = await AsyncStorage.getItem('BOOK_POST')
        if (temp) {
            setBookPost(JSON.parse(temp));
            toastOff();
        }
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false; s
    }
}
export async function storeUserBook() {
    try {
        await AsyncStorage.setItem('USER_BOOK', JSON.stringify(state.userBookReducerState.userBookData));
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false;
    }
}

export async function getUserBook() {
    try {
        const temp = await AsyncStorage.getItem('USER_BOOK')
        if (temp) {
            addUserBook(JSON.parse(temp));
            toastOff();
        }
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false; s
    }
}

export async function storeBuyerBook() {
    try {
        await AsyncStorage.setItem('BUYER_BOOK', JSON.stringify(state.buyerBookReducerState.buyerBookData));
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false;
    }
}

export async function getBuyerBook() {
    try {
        const temp = await AsyncStorage.getItem('BUYER_BOOK')
        if (temp) {
            setBuyerBook(JSON.parse(temp));
            toastOff();
        }
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false; s
    }
}
export async function storeChat() {
    try {
        await AsyncStorage.setItem('CHAT', JSON.stringify(state.chatReducerState.chatData));
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false;
    }
}

export async function getChat() {
    try {
        const temp = await AsyncStorage.getItem('CHAT')
        if (temp) {
            setChat(JSON.parse(temp));
            toastOff();
        }
        return true;
    } catch (e) {
        alert('Some internal error occur')
        return false; s
    }
}