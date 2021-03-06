import * as ActionTypes from "./ActionTypes"

export const saveProfile = userInfo => ({
    type: ActionTypes.SAVE_PROFILE,
    payload: userInfo
})

export const saveBook = book => ({
    type: ActionTypes.SAVE_BOOK,
    payload: book
})

export const deleteBook = book => ({
    type: ActionTypes.DELETE_BOOK,
    payload: book
})

export const readBook = book => ({
    type: ActionTypes.READ_BOOK,
    payload: book
})

export const deleteReadBook = book => ({
    type: ActionTypes.DELETE_READ_BOOK,
    payload: book
})
