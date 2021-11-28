import * as ActionTypes from "./ActionTypes"

export const profile = (state = {}, action) => {
    switch (action.type){
        case ActionTypes.SAVE_PROFILE:
            return {...state, ...action.payload}
        default:
            return state
    }
}
