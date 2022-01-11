const httpStatus = require('http-status');
// const ApiError = require('../../utils/ApiError');

module.exports = {
    alive: (_, res) => {
        res.status( httpStatus.ACCEPTED).json({message: "Welcome to the Backend"})
    }
}