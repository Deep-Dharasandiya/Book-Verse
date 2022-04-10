import { Buyer_Book_Actions } from "../../constant/actionType";
export const buyerBookReducerInitialState = {
    buyerBookData: [],
}

export default function buyerBookReducer(state = bookPostReducerInitialState, action) {
    switch (action.type) {
        case Buyer_Book_Actions.SET_BUYER_BOOK_STATE:
            return {
                ...state,
                buyerBookData: action.payload
            }
        case Buyer_Book_Actions.ADD_BUYER_BOOK:
            return {
                ...state,
                buyerBookData: state.buyerBookData.concat(action.payload)
            }
        case Buyer_Book_Actions.ADD_NEW_BUYER_BOOK:
            return {
                ...state,
                buyerBookData: [action.payload, ...state.buyerBookData]
            }
        case Buyer_Book_Actions.DELETE_BUYER_BOOK:
            return {
                ...state,
                buyerBookData: state.buyerBookData.filter((item) => item._id != action.payload)
            }
        case Buyer_Book_Actions.CLEAR_BOOK:
            return {
                ...state,
                buyerBookData: []
            }

        default: {
            return state;
        }
    }
}
