const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./database");
const cors = require("cors");

const app = express();
dotenv.config({ path: ".env" });

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("web server is running");
});

connectDatabase();

const userRoute = require("./userRoute");

app.use("/", userRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
