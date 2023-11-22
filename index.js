const express = require("express");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");

require("dotenv").config();
const mongoose = require("mongoose");
app.get("/", (req, res) => {
  res.send("welcome");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_DB, console.log("mongoose connected"));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection err:"));
db.once("open", () => {
  console.log("database connected", process.env.MONGO_DB);
});


app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
