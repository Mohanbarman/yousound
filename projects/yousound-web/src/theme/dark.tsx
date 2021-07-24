import { createTheme } from "@material-ui/core";

export const darkTheme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto"].join(","),
  },
  palette: {
    type: "dark",
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#dbdbdb",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: "8px",
      },
    },
  },
});
