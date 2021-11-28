import * as ActionTypes from "./ActionTypes"

export const saveProfile = userInfo => ({
    type: ActionTypes.SAVE_PROFILE,
    payload: userInfo
})

// export const saveBook = bookId => ({
//     type: ActionTypes.SAVE_BOOK,
//     payload: bookId
// })
