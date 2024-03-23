const { Database, Table } = require("st.db");

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

module.exports = {
    addItemInInventory,
    removeItemInInventory
};