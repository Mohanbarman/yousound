import { Typography } from "@material-ui/core";
import { FC } from "react";

export const Heading: FC = () => {
  return (
    <Typography
      color="textPrimary"
      variant="h5"
      style={{ textAlign: "center" }}
    >
      <b>Youtube</b> for listeners <br />
      listen to songs, podcasts or anything
    </Typography>
  );
};
