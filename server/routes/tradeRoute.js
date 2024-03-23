const { getDatabase } = require("../database/getDatabase");

async function tradeRoute(req, res, cache)
{
    const database = await getDatabase("users.json", "users");

    if (req.method !== 'GET')
        return res.status(405).send({ message: 'Please use GET method' });
    if (database === null || database === undefined)
        return res.status(500).send({ message: 'Internal server error' })
    const userID = await checkToken(req.headers);
    if (userID === -1)
        return res.status(401).send({ message: 'Unauthorized' });

    let allUsers = {};
    Object.keys(database).forEach(async (user) => {
        if (database[user].userID !== userID)
            allUsers[database[user].userID] = database[user].username;
    });

    return res.status(200).send({
        numberOfUsers: Object.keys(allUsers).length,
        users: allUsers
    });
}

module.exports = {
    tradeRoute
};
