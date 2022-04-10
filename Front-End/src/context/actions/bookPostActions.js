import { dispatch } from "../store/ContextStore";
import { storeBookPost } from "../localStorage/LocalStorage";
import { BookPost_Actions } from "../../constant/actionType";

export function setBookPost(data) {
    dispatch.bookPostReducerDispatch({
        type: BookPost_Actions.SET_BOOK_POST_STATE,
        payload: data,
    });
    storeBookPost();
}
export function addBookPost(data) {
     dispatch.bookPostReducerDispatch({
        type: BookPost_Actions.ADD_BOOK_POST,
         payload: data,
     });
    storeBookPost();
}
export function addNewBookPost(data) {
    dispatch.bookPostReducerDispatch({
        type: BookPost_Actions.ADD_NEW_BOOK_POST,
        payload: data,
    });
    storeBookPost();
}
export function deleteBookPost(data) {
    dispatch.bookPostReducerDispatch({
        type: BookPost_Actions.DELETE_BOOK_POST,
        payload: data,
    });
    storeBookPost();
}
export function updateBookPost(data) {
    dispatch.bookPostReducerDispatch({
        type: BookPost_Actions.UPDATE_BOOK_POST,
        payload: data,
    });
    storeBookPost();
}
export function clearBookPost(data) {
    dispatch.bookPostReducerDispatch({
        type: BookPost_Actions.CLEAR_BOOK,
        payload: data,
    });
    storeBookPost();
}