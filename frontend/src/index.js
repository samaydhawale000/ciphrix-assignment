import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript, ColorModeProvider } from "@chakra-ui/color-mode";
import theme from "./theme";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ColorModeScript />
    <ChakraProvider value={theme}>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </BrowserRouter>
);
