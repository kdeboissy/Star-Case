const { getDatabase } = require("../../database/getDatabase");

async function loginRoute(req, res)
{
    const users = await getDatabase("users.json", "users");
    let email = null;
    let password = null;

    if (req.method !== 'POST')
        return await res.status(401).send({ message: 'Please use POST method' });
    if (!req.body)
        return await res.status(400).send({ message: 'Please provide data' });
    if (!req.body.email)
        return await res.status(400).send({ message: 'Please provide email' });
    if (!req.body.password)
        return await res.status(400).send({ message: 'Please provide password' });

    email = req.body.email;
    password = req.body.password;

    if (users === null || users === undefined || users[email] === undefined)
        return await res.status(404).send({ message: 'User not found' });
    if (users[email].password !== password)
        return await res.status(401).send({ message: 'Invalid password' });
    return await res.status(200).send({
        message: 'Logged in',
        token: `${users[email].token}`
    });
}

module.exports = {
    loginRoute
};
