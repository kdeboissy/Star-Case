const { getDatabase } = require("../database/getDatabase");

async function userRoute(req, res, cache)
{
    const database = await getDatabase("users.json", "users");

    if (req.method !== 'GET')
        return res.status(405).send({ message: 'Please use GET method' });
    if (database === null || database === undefined)
        return res.status(500).send({ message: 'Internal server error' })

    database.forEach(user => {
        if (user.token === req.headers.authorization)
            return res.status(200).send({
                username: user.username,
                email: user.email
            });
    });

    return res.status(401).send({ message: 'Unauthorized' });
}

module.exports = {
    userRoute
};
