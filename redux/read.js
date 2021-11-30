import * as ActionTypes from "./ActionTypes"

export const read = (state = {readBooks: []}, action) => {
    switch (action.type) {
        case ActionTypes.READ_BOOK: 
            return {...state, readBooks: state.readBooks.concat(action.payload)}
        case ActionTypes.DELETE_READ_BOOK: 
            return {...state, readBooks: state.readBooks.filter(book => book !== action.payload)}
        default: 
            return state
    }
}