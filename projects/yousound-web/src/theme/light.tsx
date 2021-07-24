import { createTheme } from "@material-ui/core";

export const lightTheme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto"].join(","),
  },
  palette: {
    type: "light",
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#2c2c2c",
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
