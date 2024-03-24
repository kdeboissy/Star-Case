const { getDatabase } = require("../database/getDatabase");
const { getRandomFromStars } = require("../random");

async function getProbability(type)
{
    const probability = await getDatabase("items.json", "dropRate");
    return probability[type] * 1000;
}

async function openCase(req, res, cache)
{
    const items = await getDatabase("items.json", "items");
    const random = await getRandomFromStars();
    let listItems = [];
    let keys = Object.keys(items);

    for (let index = 0; index < keys.length; ++index) {
        const item = keys[index];

        let temp = await getProbability(items[item].rarity);

        for (let index = 0; index < temp; ++index) {
            listItems.push(item);
        }
    }

    let pickRandomItem = listItems[random % listItems.length];

    return res.status(200).send({ item: items[pickRandomItem] });
}

module.exports = {
    openCase
};