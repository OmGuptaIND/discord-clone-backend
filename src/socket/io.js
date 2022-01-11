const socketIo = require("socket.io");
const routes = require("./socket.routes");

let io;

const getSockerIo = async () => {
    if (!io) {
        throw new Error("Socket Not Available bro");
    }
    return io;
};

const setup = async (sever) => {
    io = socketIo(sever, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    }).on("connection", (socket) => {
        // init routes
        routes.map((route) =>
            socket.on(route.name, (data) => route.controller(socket, data))
        );
    });
};

module.exports = { setup, getSockerIo };
