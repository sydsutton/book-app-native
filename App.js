import React from "react"
import Main from "./components/MainComponent"
import { Provider } from "react-redux"
import { createStore } from "redux"
import bookReducer from "./redux/bookReducer"

const store = createStore({
  books: bookReducer
})

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
