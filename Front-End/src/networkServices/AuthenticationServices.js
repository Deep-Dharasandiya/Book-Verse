import { Network_Services } from "../constant/actionType";
import { aleartOn, loadingStart } from "../context/actions/commonActions";
import postMethod from "./PostMethod";

export  function checkMobileNumberRegister(body) {
    loadingStart();
    const response=postMethod(body, Network_Services.CHECK_MOBILE_NUMBER_REGISTER)
    return response;
}
export function registerUser(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.REGISTER_USER)
    return response;
}
export function forgotPassword(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.FORGOT_PASSWORD)
    return response;
}
export function login(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.LOGIN)
    return response;
}
export function logout(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.LOGOUT)
    return response;
}
export function uploadBook(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.UPLOAD_BOOK)
    return response;
}
export function fetchAllBook(body) {
    const response = postMethod(body, Network_Services.FETCH_ALL_BOOKS)
    return response;
}
export function fetchUploadedBook(body) {
    const response = postMethod(body, Network_Services.FETCH_UPLOADED_BOOKS)
    return response;
}
export function updateUploadedBook(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.UPDATE_USER_BOOK)
    return response;
}
export function addRequest(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.ADD_REQUEST)
    return response;
}
export function fetchBuyerBook(body) {
    const response = postMethod(body, Network_Services.FETCH_BUYER_BOOKS)
    return response;
}
export function addSellerConfirmation(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.ADD_SELLER_CONFIRMATION)
    return response;
}
export function addBuyerConfirmation(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.ADD_BUYER_CONFIRMATION)
    return response;
}
export function addDeliveredFlag(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.ADD_DELIVERE_FLAG)
    return response;
}
export function addReceivedFlag(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.ADD_RECEIVED_FLAG)
    return response;
}
export function deleteBook(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.DELETE_BOOK)
    return response;
}
export function DeleteRequest(body) {
    loadingStart();
    const response = postMethod(body, Network_Services.DELETE_REQUST)
    return response;
}
export function InsertChat(body) {
    const response = postMethod(body, Network_Services.INSERT_CHAT)
    return response;
}
export function GetChat(body) {
    const response = postMethod(body, Network_Services.GET_CHAT)
    return response;
}
export function GetSoldHistory(body) {
    const response = postMethod(body, Network_Services.SOLD_HISTORY)
    return response;
}
export function GetPurchaseHistoryt(body) {
    const response = postMethod(body, Network_Services.PURCHASE_HISTORY)
    return response;
}

function timeOut(){
    setTimeout(() => {
        aleartOn("dfjuhidgh");
       return false;
    }, 3000);
}