async function trade(req, res, cache)
{
    let username = null;
    let trade_username = null;
    let itemID = null;

    if (req.method !== 'POST')
        return res.status(401).send({ message: 'Please use POST method' });
    if (!req.body)
        return res.status(400).send({ message: 'Please provide data' });
    if (!req.body.username)
        return await res.status(400).send({ message: 'Please provide your username' });
    if (!req.params.userID)
        return await res.status(400).send({ message: 'Please provide username to trade with' });
    if (!req.body.itemID)
        return await res.status(400).send({ message: 'Please provide the item ID' });

    username = req.body.username;
    trade_username = req.params.userID;
    itemID = req.body.itemID;

    

    return res.status(200).send({ message: 'Not implemented' });
}

module.exports = {
    trade
};
