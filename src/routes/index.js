const express = require('express');
const helloRoute = require('../controllers/Hello/hello.routes')
const router = express.Router();

router.use('/hello', helloRoute)

module.exports = router;