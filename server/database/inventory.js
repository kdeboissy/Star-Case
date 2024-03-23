const { Database, Table } = require("st.db");
const { getDatabase } = require("./getDatabase");

async function addItemInInventory(userID, item)
{
    const database = new Database("inventories.json");
    const users = new Table("users", database);
    let items = [];

    const user = await database.get("users")
    if (user == null || user == undefined || user[userID] === null || user[userID] === undefined){
        items = [item];
    } else {
        items = user[userID].inventory;
        items.push(item);
    }
    let newUser = {
        inventorySize: items.length,
        inventory: items,
    };
    await users.set(userID, newUser);
}

async function removeItemInInventory(userID, itemID)
{
    const database = new Database("inventories.json");
    const users = new Table("users", database);
    let items = [];
    let find = false;

    const user = await database.get("users")
    if (user == null || user == undefined || user[userID] === null || user[userID] === undefined){
        return false;
    } else {
        items = user[userID].inventory;
        for (let i = 0; i < items.length; i++) {
            if (items[i] === itemID) {
                items.splice(i, 1);
                find = true;
                break;
            }
        }
    }
    let newUser = {
        inventorySize: items.length,
        inventory: items,
    };
    await users.set(userID, newUser);
    return true;
}

async function getInventory(userID)
{
    const database = await getDatabase("inventories.json", "users");

    if (database === null || database === undefined || database[userID] === null || database[userID] === undefined)
        return {
            inventorySize: 0,
            inventory: {}
        };

    let inventory = database[userID].inventory;
    let newInventory = [];

    let colors = await getDatabase("items.json", "colors");
    for (let i = 0; i < inventory.length; i++){
        let item = await getDatabase("items.json", "items");
        newInventory.push({
            name: item[inventory[i]].name,
            rarity: item[inventory[i]].rarity,
            color: colors[item[inventory[i]].rarity],
            path: item[inventory[i]].path,
        });
    }

    return {
        inventorySize: database[userID].inventory.length,
        inventory: newInventory
    };
}

module.exports = {
    addItemInInventory,
    removeItemInInventory,
    getInventory
};