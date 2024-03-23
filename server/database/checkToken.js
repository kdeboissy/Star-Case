const { getDatabase } = require("./getDatabase");


async function checkToken(header)
{
    let returnValue = -1;
    if (!header || !header.authorization)
        return returnValue;

    const token = header.authorization;
    const users = await getDatabase("users.json", "users");

    Object.keys(users).forEach(async (user) => {
        if (users[user].token === token)
            returnValue = users[user].userID;
    });

    return returnValue;
}

module.exports = {
    checkToken
};