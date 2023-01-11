const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// routes
const customerRoutes = require("./routes/index");
app.use("/api", customerRoutes);

app.listen(4000, () => {
  console.log("customer app started");
});
