import { Box, Divider, Typography } from "@material-ui/core";
import { FC } from "react";

const technologies = [
  { name: "youtube-dl", link: "https://github.com/ytdl-org/youtube-dl" },
  {
    name: "google-oauth-2.0",
    link: "https://developers.google.com/identity/protocols/oauth2",
  },
  {
    name: "youtube-data-api",
    link: "https://developers.google.com/youtube/v3/docs",
  },
];

export const Footer: FC = () => {
  return (
    <Box display="flex" flexDirection="column" gridGap="10px">
      <Typography color="textPrimary">Made with ❤️ by Mohan Barman</Typography>
      <Divider light={true} />
      <Box display="flex" flexDirection="row" flexWrap="wrap" gridGap="20px">
        {technologies.map((_technology) => (
          <a href={_technology.link} style={{ textDecoration: "none" }}>
            <Typography variant="caption" color="textSecondary">
              {_technology.name}
            </Typography>
          </a>
        ))}
      </Box>
    </Box>
  );
};
