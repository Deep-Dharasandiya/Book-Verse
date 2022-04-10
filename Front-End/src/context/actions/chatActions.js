import { dispatch } from "../store/ContextStore";
import { storeChat } from "../localStorage/LocalStorage";
import { Chats_Actions } from "../../constant/actionType";

export function setChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.SET_CHAT,
        payload: data,
    });
}
export function addChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.ADD_CHAT,
        payload: data,
    });
    storeChat();
}
export function addNewChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.ADD_NEW_CHAT,
        payload: data,
    });
    storeChat();
}
export function deleteBookChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.DELETE_BOOK_CHAT,
        payload: data,
    });
    storeChat();
}
export function replaceChat(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.REPLACE_CHAT,
        payload: data,
    });
    storeChat();
}
export function clearChats(data) {
    dispatch.chatReducerDispatch({
        type: Chats_Actions.CLEAR_CHATS,
        payload: data,
    });
    storeChat();
}