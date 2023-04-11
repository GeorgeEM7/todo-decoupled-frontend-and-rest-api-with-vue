const express = require("express");

const db = require("./data/database");

const todosRoutes = require("./routes/todos.routes");

const enableCorsMiddleware = require("./middlewares/cors");

const app = express();

app.use(enableCorsMiddleware);

app.use(express.json());

app.use("/todos", todosRoutes);

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Somthing went wrong!",
  });
});

db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connection to the database failed");
  });
