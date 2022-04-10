import { dispatch } from "../store/ContextStore";
import { storeBuyerBook } from "../localStorage/LocalStorage";
import { Buyer_Book_Actions } from "../../constant/actionType";

export function setBuyerBook(data) {
    dispatch.buyerBookReducerDispatch({
        type: Buyer_Book_Actions.SET_BUYER_BOOK_STATE,
        payload: data,
    });
   
}
export function addBuyerBook(data) {
    dispatch.buyerBookReducerDispatch({
        type: Buyer_Book_Actions.ADD_BUYER_BOOK,
        payload: data,
    });
    storeBuyerBook()
}
export function addBuyerNewBook(data) {
    dispatch.buyerBookReducerDispatch({
        type: Buyer_Book_Actions.ADD_NEW_BUYER_BOOK,
        payload: data,
    });
    storeBuyerBook()
}
export function deleteBuyerBook(data) {
    dispatch.buyerBookReducerDispatch({
        type: Buyer_Book_Actions.DELETE_BUYER_BOOK,
        payload: data,
    });
    storeBuyerBook()
}

export function clearBuyerBook(data) {
    dispatch.buyerBookReducerDispatch({
        type: Buyer_Book_Actions.CLEAR_BOOK,
        payload: data,
    });
    storeBuyerBook()
}