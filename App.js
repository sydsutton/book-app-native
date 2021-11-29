import React from "react"
import Main from "./components/MainComponent"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import { profile } from "./redux/profile"
import { save } from "./redux/save"
import { read } from "./redux/read"

const rootReducer = combineReducers({profile, save, read})

const store = createStore(rootReducer)

// const store = createStore(profile)

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
