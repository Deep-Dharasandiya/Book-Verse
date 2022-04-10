import { UserBook_Actions } from "../../constant/actionType";
export const userBookReducerInitialState = {
    userBookData: [],
}

export default function userBookReducer(state = userBookReducerInitialState, action) {
    switch (action.type) {
        case UserBook_Actions.SET_USER_BOOK_STATE:
            return {
                ...state,
                bookPostData: state.bookPostData.concat(action.payload)
            }
        case UserBook_Actions.ADD_USER_BOOK:
            return {
                ...state,
                userBookData: state.userBookData.concat(action.payload)
            }
        case UserBook_Actions.ADD_NEW_USER_BOOK:
            return {
                ...state,
                userBookData: [action.payload].concat(state.userBookData)
            }
        case UserBook_Actions.DELETE_USER_BOOK:
            return {
                ...state,
                userBookData: state.userBookData.filter((item) => item._id != action.payload)
            }
        case UserBook_Actions.CLEAR_BOOK:
            return {
                ...state,
                userBookData: []
            }
        default: {
            return state;
        }
    }
}
