const { createUser } = require("../../database/createUser");
const { getDatabase } = require("../../database/getDatabase");

async function newUserRoute(req, res)
{
    let username = null;
    let password = null;
    let email = null;

    if (req.method !== 'POST')
        return res.status(401).send({ message: 'Please use POST method' });
    if (!req.body)
        return res.status(400).send({ message: 'Please provide data' });

    username = req.body.username;
    password = req.body.password;
    email = req.body.email;
    if (!username || !password || !email)
        return res.status(400).send({ message: 'Please provide username, password and email' });

    const users = await getDatabase("users.json", "users");
    if (users === null || users === undefined || users[email] === undefined){
        await createUser(username, password, email);
        return res.status(201).send({ message: 'User created' });
    }
    return res.status(409).send({ message: 'User already exist' });
}

module.exports = {
    newUserRoute
};
