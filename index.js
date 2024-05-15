const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const UserRouter = require("./routes/UserRoute");
const ProjectRouter = require("./routes/ProjectRoute");
const { mainRouter } = require("./routes/Main");
const db = require("./db/db");
const Auth = require("./middleware/Auth");
db();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", UserRouter);
app.use("/api/project", [Auth], ProjectRouter);
app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
