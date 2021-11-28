import * as ActionTypes from "./ActionTypes"

export const save = (state = {books: []}, action) => {
    switch (action.type) {
        case ActionTypes.SAVE_BOOK: 
        console.log("reducer", action.payload)

            // if(state.includes(action.payload)){
            //     return state
            // }
            return {...state, books: state.books.concat(action.payload)}
        default: 
            return state
    }
}