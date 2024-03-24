const { registerLogRequests } = require('./logs/registerLogRequests');
const { mainRoute } = require('./routes/mainRoute');
const { getUserInventory } = require('./routes/user/inventory');
const { loginRoute } = require('./routes/users/login');
const { registerRoute } = require('./routes/users/register');
const { trade } = require('./routes/users/trade');
const { acceptTrade } = require('./routes/users/acceptTrade');

const methodOverride = require('method-override');
const express = require('express');
const { userRoute } = require('./routes/userRoute');
const { tradeRoute } = require('./routes/user/tradeRoute');
const { usersRoute } = require('./routes/usersRoute');
const { itemsRoute, itemRoute } = require('./routes/itemRoute');
require('dotenv').config();

async function registerRoutes(app, cache)
{
    const routes = {
        '/': function(req, res) { mainRoute(req , res, cache) },
        '/users': function(req, res) { usersRoute(req, res, cache) },
        '/user': function(req, res) { userRoute(req, res, cache) },
        '/user/inventory': function(req, res) { getUserInventory(req, res, cache) },
        '/user/trade': function(req, res) { tradeRoute(req, res, cache) },

        '/items': function(req, res) { itemsRoute(req, res, cache) },
        '/item/:id': function(req, res) { itemRoute(req, res, cache) },

        '/users/register': function(req, res) { registerRoute(req, res, cache) },
        '/users/login': function(req, res) { loginRoute(req, res, cache) },
        '/users/trade/:userID': function(req, res) { trade(req, res, cache) },
        '/users/accept_trade/:userID': function(req, res) { acceptTrade(req, res, cache) }
    }

    for (const [route, routeFunction] of Object.entries(routes)){
        console.info("[+] Registering route: " + route)
        await app.all(route, routeFunction);
    }
    await app.all('*', async (req, res) => res.status(404).send({error: 'Not Found'}));
}

function handleOptionRequests(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-HTTP-Method-Override, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS')
        return res.status(200).send();
    next();
}

function showCache(cache)
{
    setInterval(() => {
        console.log(cache);
    }, 10000);
}

async function initCache(cache)
{
    cache.activeTrades = {};
}

async function getDate()
{
    const date = new Date();
    const lastDate = new Date(date.getTime() - (24 * 60 * 60 * 1000))
    const toReturn = {}

    toReturn.currentYear = date.getFullYear();
    toReturn.currentMonth = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1)
    toReturn.currentDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    toReturn.currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    toReturn.currentMin = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    toReturn.currentSec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    toReturn.lastYear = lastDate.getFullYear();
    toReturn.lastMonth = (lastDate.getMonth() + 1) < 10 ? `0${lastDate.getMonth() + 1}` : (lastDate.getMonth() + 1)
    toReturn.lastDay = lastDate.getDate() < 10 ? `0${lastDate.getDate()}` : lastDate.getDate();

    return toReturn;
}

async function main() {
    const cache = {}
    const app = express();
    const port = process.env.PORT;

    app.use(express.json());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(handleOptionRequests);

    // setInterval(async () => {
    //     console.log(await getRandomOfStars());
    // }, 3000);
    await initCache(cache);
    await registerLogRequests(app);
    await registerRoutes(app, cache);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();
