import React from "react"
import Main from "./components/MainComponent"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { userInfo } from "./redux/profile"

const store = createStore(userInfo)

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
