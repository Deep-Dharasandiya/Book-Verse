import { dispatch } from "../store/ContextStore";
import { storeUserBook } from "../localStorage/LocalStorage";
import { UserBook_Actions } from "../../constant/actionType";

export function addUserBook(data) {
    dispatch.userBookReducerDispatch({
        type: UserBook_Actions.ADD_USER_BOOK,
        payload: data,
    });
    storeUserBook();
}
export function addNewUserBook(data) {
    dispatch.userBookReducerDispatch({
        type: UserBook_Actions.ADD_NEW_USER_BOOK,
        payload: data,
    });
    storeUserBook();
}
export function deleteUserBook(data) {
    dispatch.userBookReducerDispatch({
        type: UserBook_Actions.DELETE_USER_BOOK,
        payload: data,
    });
    storeUserBook();
}
export function clearUserBook(data) {
    dispatch.userBookReducerDispatch({
        type: UserBook_Actions.CLEAR_BOOK,
        payload: data,
    });
    storeUserBook();
}


