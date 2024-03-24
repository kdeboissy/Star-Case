const { getDatabase } = require("../database/getDatabase");

/**
 * @description Get all items
 * @param {*} req request
 * @param {*} res response
 * @param {*} cache cache
 * @returns Promise : {numberOfItems, items: [{itemColor, itemDatas}]}
 */
async function itemsRoute(req, res, cache)
{
    const database = await getDatabase("items.json", "items");
    const colors = await getDatabase("items.json", "colors");
    let items = [];

    if (req.method !== 'GET')
        return res.status(405).send({ message: 'Please use GET method' });
    if (!database)
        return res.status(500).send({ message: 'Database error' });
    Object.keys(database).forEach(async (item) => {
        let itemData = database[item];
        itemData.id = item;
        items.push({
            itemColor: colors[database[item].rarity],
            itemDatas: itemData
        });
    })

    return res.status(200).send({
        numberOfItems: Object.keys(items).length,
        items: items
    });
}

/**
 * @description Get item by ID
 * @param {*} req request
 * @param {*} res response
 * @param {*} cache cache
 * @returns Promise : {itemColor, itemDatas}
 */
async function itemRoute(req, res, cache)
{
    const database = await getDatabase("items.json", "items");
    const colors = await getDatabase("colors.json", "colors");

    if (req.method !== 'GET')
        return res.status(405).send({ message: 'Please use GET method' });
    if (!database)
        return res.status(500).send({ message: 'Database error' });
    if (!req.params || !req.params.id)
        return res.status(400).send({ message: 'Missing item ID' });
    if (!database[req.params.id])
        return res.status(400).send({ message: 'Item not found' });

    return res.status(200).send({
        itemColor: colors[database[req.params.id].rarity],
        itemDatas: database[req.params.id]
    });
}

module.exports = {
    itemRoute,
    itemsRoute
};
