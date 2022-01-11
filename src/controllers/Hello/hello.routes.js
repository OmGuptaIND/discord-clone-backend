const express = require('express');
const helloController = require('./hello.controller');

const router = express.Router();

router
    .route('/')
    .get(helloController?.alive)

module.exports = router;