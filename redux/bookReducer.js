import { LOAD_BOOKS } from "./ActionTypes"
import BOOKS from "../booksData/BOOKS"

const initialState = {
    books: BOOKS
}

const bookReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_BOOKS:
            return state
        default:
            return state
    }
}

export default bookReducer