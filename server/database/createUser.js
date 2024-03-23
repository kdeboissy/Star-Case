const { Database, Table } = require("st.db");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function getUserNextUserID()
{
    const database = await new Database("users.json");
    const userID = await database.get("userCount");

    if (userID === null || userID === undefined)
    {
        await database.set("userCount", 1);
        return (0);
    } else {
        await database.set("userCount", userID + 1);
        return (userID);
    }
}

async function createUser(username, password, email)
{
    const userID = await getUserNextUserID();
    const db = await new Database("users.json");
    const users = await new Table("users", db);
    const accountCreationAt = new Date().getTime();
    const accountPassword = await bcrypt.hash(password, process.env.SALT);

    await users.set(email, {
        userID: userID,
        username: username,
        accountCreationAt: accountCreationAt,
        password: accountPassword,
        token: jwt.sign(`${email}:${accountCreationAt}:${accountPassword}`, process.env.SECRET, {algorithm: 'HS256'})
    });
}

module.exports = {
    createUser
};