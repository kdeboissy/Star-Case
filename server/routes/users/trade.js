const { checkToken } = require("../../database/checkToken");
const { getDatabase } = require("../../database/getDatabase");
const { getInventory } = require("../../database/inventory");

async function trade(req, res, cache)
{
    let trade_username = null;
    let itemWanted = null;
    let itemOffered = null;

    if (req.method !== 'POST')
        return res.status(401).send({ message: 'Please use POST method' });
    if (!req.body)
        return res.status(400).send({ message: 'Please provide data' });
    if (!req.params.userID)
        return res.status(400).send({ message: 'Please provide userID of the user you want to trade with' });
    if (!req.body.itemWanted)
        return res.status(400).send({ message: 'Please provide itemWanted' });
    if (!req.body.itemOffered)
        return res.status(400).send({ message: 'Please provide itemOffered' });

    trade_username = req.params.userID;
    itemWanted = req.body.itemWanted;
    itemOffered = req.body.itemOffered;

    let usersDB = await getDatabase("users.json", "users");
    let myUserID = await checkToken(req.headers);
    if (myUserID === -1)
        return res.status(401).send({ message: 'Unauthorized' });
    if (cache.activeTrades[req.params.userID] && cache.activeTrades[req.params.userID].userID === myUserID)
        return res.status(400).send({ message: 'You already have a trade request with this user' });
    if (req.params.userID === myUserID)
        return res.status(400).send({ message: 'You cannot trade with yourself' });
    let myInventory = await getInventory(myUserID);

    for (const item of itemOffered) {
        if (myInventory.inventory.includes(item))
            myInventory.inventory.splice(myInventory.inventory.indexOf(item), 1);
        else
            return res.status(400).send({ message: 'Not all items offered are in the inventory' });
    }

    cache.activeTrades[trade_username] = {
        userID: myUserID,
        userName: usersDB[myUserID].username,
        itemWanted: itemWanted,
        itemOffered: itemOffered
    }

    return res.status(200).send({ message: 'Trade request sent' });
}

module.exports = {
    trade
};
