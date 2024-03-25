const { checkToken } = require("../database/checkToken");
const { getDatabase } = require("../database/getDatabase");
const { addItemInInventory } = require("../database/inventory");
const { getRandomFromStars } = require("../random");

async function getProbability(type, crateID)
{
    const probability = await getDatabase("items.json", "dropRate");
    const typeList = [
        "Commun",
        "Rare",
        "Epique",
        "Legendaire",
        "Mythique"
    ]
    let typeIndex = typeList.indexOf(type);
    // typeIndex = typeIndex + parseInt(crateID);

    // if (typeIndex >= typeList.length)
        // typeIndex = typeList.length - 1;

    if (typeIndex < parseInt(crateID))
        return (Math.ceil((probability[typeList[typeIndex]] * 1000) / Math.pow(10, parseInt(crateID) - typeIndex)));
    else
        return probability[typeList[typeIndex]] * 1000;
}

async function openCase(req, res, cache)
{
    const items = await getDatabase("items.json", "items");
    const random = await getRandomFromStars();
    let listItems = [];
    let crateID;
    let keys = Object.keys(items);

    if (req.method !== 'GET')
        return res.status(401).send({ message: 'Please use GET method' });
    if (!req.params || !req.params.boxID)
        crateID = 0;
    else
        crateID = req.params.boxID;
    const userID = await checkToken(req.headers);
    if (userID === -1)
        return res.status(401).send({ message: 'Unauthorized' });

    for (let index = 0; index < keys.length; ++index) {
        const item = keys[index];

        let temp = await getProbability(items[item].rarity, crateID);

        for (let index = 0; index < temp; ++index) {
            listItems.push(item);
        }
    }

    let pickRandomItem = listItems[random % listItems.length];
    await addItemInInventory(userID, pickRandomItem);

    return res.status(200).send({ item: items[pickRandomItem] });
}

module.exports = {
    openCase,
    getProbability
};