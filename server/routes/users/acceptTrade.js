async function acceptTrade(req, res, cache)
{
    let trade_username = null;

    if (req.method !== 'POST')
        return res.status(401).send({ message: 'Please use POST method' });
    if (!req.body)
        return res.status(400).send({ message: 'Please provide data' });
    if (!req.params.userID)
        return await res.status(400).send({ message: 'Please provide username to trade with' });

    trade_username = req.params.userID;

    return res.status(200).send({ message: 'Not implemented' });
}

module.exports = {
    acceptTrade
};