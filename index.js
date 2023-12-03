const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use(require("./routes/question.routes"));
app.use(require("./routes/auth.routes"));
app.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listen on port: ${port}`);
});
