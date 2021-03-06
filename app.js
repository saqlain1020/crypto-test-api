const express = require("express");
const rateLimit = require("express-rate-limit"); //for brute force attack
const mongoSanitize = require("express-mongo-sanitize"); //for noSql query injections
const xss = require("xss-clean"); //for XSS attack (remove script tags)
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const morgan = require('morgan')

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1hr
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "you've exceed the number of requests",
});

const app = express();

//implementing cors
app.use(cors({ origin: true, credentials: true }));
//serving static content
app.use(express.static("public"));
//middlewares
app.use(limiter);
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('dev'))

app.use("/api/v1/test", testRoutes);

module.exports = app;
