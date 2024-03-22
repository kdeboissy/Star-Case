const express = require('express');
const { registerLogRequests } = require('./logs/registerLogRequests');
const { mainRoute } = require('./routes/mainRoute');
const { newUserRoute } = require('./routes/users/new');
require('dotenv').config();

async function registerRoutes(app)
{
    const routes = {
        '/': mainRoute,
        '/users/new': newUserRoute,
    }

    for (const [route, routeFunction] of Object.entries(routes))
        await app.all(route, routeFunction);
}

async function main() {
    const app = express();
    const port = process.env.PORT;

    app.use(express.json());

    await registerLogRequests(app);
    await registerRoutes(app);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();