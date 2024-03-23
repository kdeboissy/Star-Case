const { registerLogRequests } = require('./logs/registerLogRequests');
const { mainRoute } = require('./routes/mainRoute');
const { getUserInventory } = require('./routes/user/inventory');
const { loginRoute } = require('./routes/users/login');
const { registerRoute } = require('./routes/users/register');
const { trade } = require('./routes/users/trade');

const express = require('express');
require('dotenv').config();

async function registerRoutes(app, cache)
{
    const routes = {
        '/': function(req, res) { mainRoute(req , res, cache) },
        '/users/register': function(req, res) { registerRoute(req, res, cache) },
        '/users/login': function(req, res) { loginRoute(req, res, cache) },
        '/user/inventory': function(req, res) { getUserInventory(req, res, cache) },
        '/users/trade/:userID': function(req, res) { trade(req, res, cache) }
    }

    for (const [route, routeFunction] of Object.entries(routes))
        await app.all(route, routeFunction);
    await app.all('*', async (req, res) => res.status(404).send({error: 'Not Found'}));
}

async function main() {
    const cache = {};
    const app = express();
    const port = process.env.PORT;

    app.use(express.json());

    await registerLogRequests(app);
    await registerRoutes(app, cache);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();
