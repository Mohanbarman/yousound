import { render } from "react-dom";
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
