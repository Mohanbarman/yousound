import { IconButton } from "@material-ui/core";
import { useContext } from "react";
import { FC } from "react";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";

import { ThemeContext } from "../context/ThemeContext";

export const ThemeSwitch: FC = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme}>
      {isDark ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
};
