const http = require("http");
const cors = require("cors");

const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const socketIo = require("./socket/io");

const { getConnection } = require("./lib/redisConnection");

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log("Connected to MongoDb");

    server = http.createServer({}, app);

    //init redisConnection
    getConnection();

    //init socket
    socketIo.setup(server, cors);

    server.listen(config.port || 8000, () => {
        console.info(`Server Start on --- http://localhost:${config.port}`);
    });
});

// const exitHandler = () => {
//     if (server) {
//         server.close(() => {
//             console.log("Server closed");
//             process.exit(1);
//         });
//     } else {
//         process.exit(1);
//     }
// };

const unexpectedErrorHandler = (error) => {
    console.log(error);
    // exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    console.log("SIGTERM received");
    // if (server) {
    //   server.close();
    // }
});
