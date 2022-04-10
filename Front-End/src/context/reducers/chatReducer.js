import { Chats_Actions } from "../../constant/actionType";
export const chatReducerInitialState = {
    chatData: [],
}

export default function chatReducer(state = chatReducerInitialState, action) {
    switch (action.type) {
        case Chats_Actions.SET_CHAT:
            return {
                ...state,
                chatData: action.payload
            }
        case Chats_Actions.ADD_CHAT:
            return {
                ...state,
                chatData: state.chatData.concat(action.payload)
            }
        case Chats_Actions.ADD_NEW_CHAT:
            return {
                ...state,
                chatData: [action.payload].concat(state.chatData)
            }
        case Chats_Actions.DELETE_BOOK_CHAT:
            return {
                ...state,
                chatData: state.chatData.filter((item)=>item.bookID != action.payload)
            }
        case Chats_Actions.CLEAR_CHATS:
            return {
                ...state,
                chatData: []
            }
        case Chats_Actions.REPLACE_CHAT:
            let temp=state.chatData;
            for(i=0;temp.length;i++){
                if(temp[i]._id==action.payload._id){
                    temp[i]=action.payload;
                    break;
                }
            }
            return {
                ...state,
                chatData: temp,
            }
        default: {
            return state;
        }
    }
}
