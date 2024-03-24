const { checkToken } = require("../../database/checkToken");
const { getDatabase } = require("../../database/getDatabase");

async function tradeRoute(req, res, cache)
{
    const database = await getDatabase("users.json", "users");

    if (req.method !== 'GET')
        return res.status(405).send({ message: 'Please use GET method' });
    if (database === null || database === undefined)
        return res.status(500).send({ message: 'Internal server error' })
    const userID = await checkToken(req.headers);
    if (userID === -1)
        return res.status(401).send({ message: 'Unauthorized' });

    let activeTrades = cache.activeTrades;
    let myTrades = {};
    Object.keys(activeTrades).forEach(async (trade) => {
        if (trade === userID)
            myTrades[activeTrades[trade.userID]] = activeTrades[trade];
    });

    return res.status(200).send({
        numberOfTrades: Object.keys(myTrades).length,
        trades: myTrades
    });
}

module.exports = {
    tradeRoute
};
