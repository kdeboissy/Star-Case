const { checkToken } = require("../../database/checkToken");

async function refuseTrade(req, res, cache)
{
    let tradeUsername = null;

    if (req.method !== 'POST')
        return res.status(401).send({ message: 'Please use POST method' });
    if (!req.body)
        return res.status(400).send({ message: 'Please provide data' });
    if (!req.params.userID)
        return await res.status(400).send({ message: 'Please provide username to trade with' });
    const userID = await checkToken(req.headers);
    if (userID === -1)
        return res.status(401).send({ message: 'Unauthorized' });
    tradeUsername = req.params.userID;

    if (cache.activeTrades[userID] === null || cache.activeTrades[userID] === undefined)
        return res.status(400).send({ message: 'No active trade with this user' });
    if (cache.activeTrades[userID].userID != tradeUsername)
        return res.status(400).send({ message: 'No active trade with this user' });

    delete cache.activeTrades[userID];
    return res.status(200).send({ message: 'Trade declined with success' });
}

module.exports = {
    refuseTrade
};