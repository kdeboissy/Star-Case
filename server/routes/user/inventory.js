const { checkToken } = require("../../database/checkToken");
const { getDatabase } = require("../../database/getDatabase");
const { getInventory } = require("../../database/inventory");

async function getUserInventory(req, res)
{
    const database = await getDatabase("inventories.json", "users");

    if (req.method !== 'GET')
        return res.status(401).send({ message: 'Please use GET method' });

    const userID = await checkToken(req.headers);
    if (userID === -1)
        return res.status(401).send({ message: 'Unauthorized' });

    if (database === null || database === undefined || database[userID] === null || database[userID] === undefined)
        return res.status(200).send({
            inventorySize: 0,
            inventory: {}
        });

    return res.status(200).send(
        await getInventory(userID)
    );
}

module.exports = {
    getUserInventory
};