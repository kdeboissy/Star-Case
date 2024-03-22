const { Database, Table } = require("st.db");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function createUser(username, password, email)
{
    const db = await new Database("users.json");
    const users = await new Table("users", db);
    const accountCreationAt = new Date().getTime();
    const accountPassword = await bcrypt.hash(password, process.env.SALT);

    await users.set(email.replace('"', '\\"'), {
        username: username,
        accountCreationAt: accountCreationAt,
        password: accountPassword,
        token: jwt.sign(`${email}:${accountCreationAt}:${accountPassword}`, process.env.SECRET, {algorithm: 'HS256'})
    });
}

module.exports = {
    createUser
};