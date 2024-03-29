"use strict";
/* ExpressJS Start */
const express = require("express");
const app = express();
/* ------------------------------------------------------------------------- */
/* ENV */ // Required Modules
require("dotenv").config();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;
/* ------------------------------------------------------------------------- */
require("express-async-errors");
/* ------------------------------------------------------------------------- */
// DB Connection
require("./src/configs/dbConnection")();
/* ------------------------------------------------------------------------- */
// Home Path
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Blog App server!!",
    documents: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});
/* ------------------------------------------------------------------------- */
// MIDDLEWARES:
app.use(express.json());
app.use(
  require("cors")()
  // {origin: ["http://localhost:3000", "http://localhost:4173", "http://localhost:5173"]}
);


app.use(require("./src/middlewares/findSearchSortPage"));
app.use(require("./src/middlewares/authentication"));
// app.use(require('./src/middlewares/loger'))
/* ------------------------------------------------------------------------- */
// ROUTES:
app.use(require("./src/routes"));
/* ------------------------------------------------------------------------- */
// errorHandler:
app.use(require("./src/middlewares/errorHandler"));
/* ------------------------------------------------------------------------- */
// DEVELOPER SIDE PORT SYSTEM
app.listen(PORT, () => console.log(`Running on http://${HOST}:${PORT}`));
