import React from "react"
import Main from "./components/MainComponent"
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"

const theme = {
  ...DefaultTheme,
  roundness: 2,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#379EDB',
    accent: '#ffd059',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Main />
    </PaperProvider>
  );
}
