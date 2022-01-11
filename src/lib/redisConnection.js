const redisObj = require('redis');

let con;

const createConnection = () => {
    const redis = redisObj.createClient({
        
    });

    redis.on('connect', () => {console.log('Connected To Redis Successs')});
    redis.on('Error', (err) => {console.log('Something Went wrong with Redis: ', err)});

    redis.connect();

    return redis;
};

module.exports.getConnection = () => {
    if( !con ) con = createConnection();

    return con;
};

