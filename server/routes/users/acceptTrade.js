const { checkToken } = require("../../database/checkToken");
const { addItemInInventory, removeItemInInventory, getInventory } = require("../../database/inventory");

async function acceptTrade(req, res, cache)
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

    let myInventory = await getInventory(userID);
    let otherInventory = await getInventory(tradeUsername);

    for (let item of cache.activeTrades[userID].itemOffered)
    {
        let find = false;
        myInventory.inventory.forEach((element) => {
            if (element.id == item && find == false){
                myInventory.inventory.splice(myInventory.inventory.indexOf(element), 1);
                find = true;
            }
        });
        if (!find)
            return res.status(400).send({ message: 'Not all items offered are in the inventory' });
    }
    for (let item of cache.activeTrades[userID].itemWanted)
    {
        let find = false;
        otherInventory.inventory.forEach((element) => {
            if (element.id == item && find == false){
                otherInventory.inventory.splice(otherInventory.inventory.indexOf(element), 1);
                find = true;
            }
        });
        if (!find)
            return res.status(400).send({ message: 'Not all items wanted are in the inventory' });
    }

    for (let item of cache.activeTrades[userID].itemOffered)
    {
        await addItemInInventory(userID, item);
        await removeItemInInventory(tradeUsername, item);
    }
    for (let item of cache.activeTrades[userID].itemWanted)
    {
        await addItemInInventory(tradeUsername, item);
        await removeItemInInventory(userID, item);
    }

    return res.status(200).send({ message: 'Trade accepted with success' });
}

module.exports = {
    acceptTrade
};