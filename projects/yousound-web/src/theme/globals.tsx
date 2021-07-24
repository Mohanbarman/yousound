import { createGlobalStyle } from "styled-components";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

interface IProps {
  isDark: boolean;
}

export const GlobalStyles = createGlobalStyle<IProps>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) =>
      props.isDark
        ? darkTheme.palette.background.default
        : lightTheme.palette.background.default}
  }
`;
