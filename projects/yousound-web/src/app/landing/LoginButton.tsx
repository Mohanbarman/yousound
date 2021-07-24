import { FC } from "react";
import { Button } from "@material-ui/core";
import { loginUrl } from "../../utils/api";

export const LoginButton: FC = () => {
  const handleClick = () => {
    const anchor = document.createElement("a");
    anchor.href = loginUrl;
    anchor.target = "_self";
    anchor.click();
  };
  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      Continue with Google
    </Button>
  );
};
