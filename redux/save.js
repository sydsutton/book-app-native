import * as ActionTypes from "./ActionTypes"

export const save = (state = {books: []}, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_BOOK: 
            // if(state.includes(action.payload)){
            //     return state
            // }
            return {...state, books: state.books.concat(action.payload)}

        case ActionTypes.DELETE_BOOK: 
            return {...state, books: state.books.filter(book => book !== action.payload)}

        default: 
            return state
    }
}