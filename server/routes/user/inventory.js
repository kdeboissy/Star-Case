async function getUserInventory(req, res)
{
    res.status(200).send({
        inventory: {}
    });
}

module.exports = {
    getUserInventory
};