const { checkToken } = require("../../database/checkToken");
const { getDatabase } = require("../../database/getDatabase");

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

    let inventory = database[userID].inventory;
    let newInventory = [];

    let colors = await getDatabase("items.json", "colors");
    for (let i = 0; i < inventory.length; i++){
        let item = await getDatabase("items.json", "items");
        newInventory.push({
            name: item[inventory[i]].name,
            rarity: item[inventory[i]].rarity,
            color: colors[item[inventory[i]].rarity],
        });
    }

    return await res.status(200).send({
        inventorySize: database[userID].inventory.length,
        inventory: newInventory
    });
}

module.exports = {
    getUserInventory
};