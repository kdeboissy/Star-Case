async function registerLogRequests(app) {
    await app.use(async (req, res, next) => {
        const fs = require('fs');
        const logFile = 'logs/logFile.txt';
        const logData = `New connection from ${req.connection.remoteAddress} to ${req.originalUrl}\n`
        + `Method: ${req.method}\n`
        + `Headers: ${JSON.stringify(req.headers)}\n`
        + `Body: ${JSON.stringify(req.body)}\n`;

        fs.appendFile(logFile, logData, (err) => {
            if (err) throw err;
        });
        await next();
    });
}

module.exports = {
    registerLogRequests
};