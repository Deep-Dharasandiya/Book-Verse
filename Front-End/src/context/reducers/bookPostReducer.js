import { BookPost_Actions } from "../../constant/actionType";
export const bookPostReducerInitialState = {
  bookPostData:[],
}

export default function bookPostReducer(state = bookPostReducerInitialState, action) {
    switch (action.type) {
        case BookPost_Actions.SET_BOOK_POST_STATE:
            return {
                ...state,
                bookPostData: state.bookPostData.concat(action.payload)
            }
        case BookPost_Actions.ADD_BOOK_POST:
            return {
                ...state,
                bookPostData:state.bookPostData.concat(action.payload)
        }
        case BookPost_Actions.ADD_NEW_BOOK_POST:
            return {
                ...state,
                bookPostData: [action.payload].concat(state.bookPostData)
            }
        case BookPost_Actions.UPDATE_BOOK_POST:{
            let bookPost = state.bookPostData;
            for (let i = 0; i < bookPost.length; i++) {
                if (bookPost[i]._id == action.payload._id) {
                    bookPost[i]=action.payload;
                    break;
                }
            }
            return {
                ...state,
                bookPostData:bookPost
              
            }
        }
        case BookPost_Actions.DELETE_BOOK_POST:
            return {
                ...state,
                bookPostData: state.bookPostData.filter((item)=>item._id != action.payload)
            }
        case BookPost_Actions.CLEAR_BOOK:
            return {
                ...state,
                bookPostData:[]
            }
        
        default: {
            return state;
        }
    }
}
