const { Database, Table } = require("st.db");

async function getDatabase(databaseName, dataName) {
    const db = new Database(databaseName);
    const datas = await db.get(dataName);

    if (datas === null || datas === undefined) return (null);

    return (datas);
}

module.exports = {
    getDatabase
};