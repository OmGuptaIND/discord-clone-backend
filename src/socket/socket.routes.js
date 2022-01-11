const { getConnection } = require("../lib/redisConnection");

const redis = getConnection();

const ONLINE_USER = "online-user-";
module.exports = [
    {
        name: "online",
        controller: async (socket, { userId }) => {
            await redis.set(`${ONLINE_USER}${socket.id}`, userId);
            socket.join(userId);
        },
    },
    {
        name: "logOut",
        controller: async (socket, userId) => {
            redis.del(`${ONLINE_USER}${socket.id}`);
            socket.leave(userId);
        },
    },
];
