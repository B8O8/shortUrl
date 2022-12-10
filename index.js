const express = require("express");
const app = express();
const DB = require("./database").connectDB;
const urlRouter = require("./routers/urlRoutes");
const redirectRouter = require("./routers/redirectionRouter");
DB();

app.use(express.json());
app.use("/", redirectRouter);
app.use("/api/url", urlRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port 8000");
});
