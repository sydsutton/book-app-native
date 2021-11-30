import * as ActionTypes from "./ActionTypes"

export const profile = (state = {firstName: "", lastName: "", email: "", password: "", isLoggedIn: false}, action) => {
    switch (action.type){
        case ActionTypes.SAVE_PROFILE:
            return {...state, ...action.payload}
        default:
            return state
    }
}
