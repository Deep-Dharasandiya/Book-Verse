import React from 'react'
import commonReducer, { commonReducerInitialState} from '../reducers/commonReducer';
import bookPostReducer, { bookPostReducerInitialState} from '../reducers/bookPostReducer';
import userBookReducer, { userBookReducerInitialState} from '../reducers/userBookReducer';
import buyerBookReducer, { buyerBookReducerInitialState} from '../reducers/buyerBookReducer';
import chatReducer, { chatReducerInitialState } from '../reducers/chatReducer';

export const rootContext = React.createContext();
export let dispatch={};
export let state={};
export default function ContextStore({children}) {
    const [commonReducerState, commonReducerDispatch] = React.useReducer(commonReducer, commonReducerInitialState);
    const [bookPostReducerState, bookPostReducerDispatch] = React.useReducer(bookPostReducer, bookPostReducerInitialState);
    const [userBookReducerState, userBookReducerDispatch] = React.useReducer(userBookReducer, userBookReducerInitialState);
    const [buyerBookReducerState, buyerBookReducerDispatch] = React.useReducer(buyerBookReducer, buyerBookReducerInitialState);
    const [chatReducerState, chatReducerDispatch] = React.useReducer(chatReducer, chatReducerInitialState);
    dispatch={
        commonReducerDispatch,
        bookPostReducerDispatch,
        userBookReducerDispatch,
        buyerBookReducerDispatch,
        chatReducerDispatch
    }
    state={
        commonReducerState,
        bookPostReducerState,
        userBookReducerState,
        buyerBookReducerState,
        chatReducerState
    }
   const store={
       commonReducerState,commonReducerDispatch,
       bookPostReducerState, bookPostReducerDispatch,
       userBookReducerState,userBookReducerDispatch,
       buyerBookReducerState, buyerBookReducerDispatch,
       chatReducerState, chatReducerDispatch,
   }
    return <rootContext.Provider value={store} >
       {children}
    </rootContext.Provider>
}
