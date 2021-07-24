import { ThemeProvider } from "@material-ui/core";
import { FC, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LandingPage } from "./app";

import { ThemeContext } from "./context/ThemeContext";
import { darkTheme, lightTheme, GlobalStyles } from "./theme";

const App: FC = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <Router>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyles isDark={isDark} />
        <Switch>
          <Route path="/" exact={true}>
            <LandingPage />
          </Route>
          <Route path="/app"></Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;
