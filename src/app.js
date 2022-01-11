const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require('cors');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const { errorConverter, errorHandler } = require('./middlewares/error');
const routes = require('./routes/index');
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");

const app = express();

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

//MORGAN SETUP
morgan.token("custom", ":http-version (:method) :url => :status")
app.use(morgan("custom"));

// gzip compression
app.use(compression());

// v1 api routes
app.use('/api/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;