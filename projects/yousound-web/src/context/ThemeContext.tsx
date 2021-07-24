import { useState } from "react";
import { createContext, FC } from "react";

const defaultValue = { isDark: true, toggleTheme: () => {} };

export const ThemeContext = createContext(defaultValue);

export const ThemeProvider: FC = (props) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((p) => !p);

  return <ThemeContext.Provider value={{ isDark, toggleTheme }} {...props} />;
};
