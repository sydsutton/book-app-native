import * as ActionTypes from "./ActionTypes"

export const userInfo = (state = {user: {}}, action) => {
    switch (action.type){
        case ActionTypes.SAVE_PROFILE:
            return {...state, user: action.payload}
        default:
            return state
    }
}
