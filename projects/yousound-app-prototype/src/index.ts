import express from "express";

import { PORT } from "./config/env";

const app = express();

app.use(express.json());

app.get("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  res.send(`<h1>${videoId}</h1>`);
});

app.listen(PORT, () => console.log(`Alive on port ${PORT} 🚀`));
