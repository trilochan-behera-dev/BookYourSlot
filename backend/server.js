const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");

var cors = require("cors");

const app = express();
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 8080;

app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

// MongoDB connection
connectDB();
// load route
app.use("/", require("./server/routers/routes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
