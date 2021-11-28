import * as ActionTypes from "./ActionTypes"

export const saveProfile = userInfo => ({
    type: ActionTypes.SAVE_PROFILE,
    payload: userInfo
})

export const saveBook = book => ({
    type: ActionTypes.SAVE_BOOK,
    payload: book
})
