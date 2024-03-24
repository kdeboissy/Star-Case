async function getDate()
{
    const date = new Date();
    const lastDate = new Date(date.getTime() - (24 * 60 * 60 * 1000))
    const toReturn = {}

    toReturn.currentYear = date.getFullYear();
    toReturn.currentMonth = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1)
    toReturn.currentDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    toReturn.currentHour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    toReturn.currentMin = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    toReturn.currentSec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    toReturn.lastYear = lastDate.getFullYear();
    toReturn.lastMonth = (lastDate.getMonth() + 1) < 10 ? `0${lastDate.getMonth() + 1}` : (lastDate.getMonth() + 1)
    toReturn.lastDay = lastDate.getDate() < 10 ? `0${lastDate.getDate()}` : lastDate.getDate();

    return toReturn;
}

async function getRandInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomFromStars()
{
    const currentDate = await getDate();
    const ApplicationID = process.env.ApplicationID;
    const ApplicationSECRET = process.env.ApplicationSECRET;
    let returnValue = getRandInt(0, 100000000000);
    const queryParameters = `latitude=0`
        + `&longitude=0`
        + `&elevation=0`
        + `&from_date=${currentDate.lastYear}-${currentDate.lastMonth}-${currentDate.lastDay}`
        + `&to_date=${currentDate.currentYear}-${currentDate.currentMonth}-${currentDate.currentDay}`
        + `&time=${currentDate.currentHour}:${currentDate.currentMin}:${currentDate.currentSec}`

    await fetch(`https://api.astronomyapi.com/api/v2/bodies/positions?${queryParameters}`, {
        method: 'GET',
        headers: {
            "Authorization": `Basic ${btoa(`${ApplicationID}:${ApplicationSECRET}`)}`,
        }
    }).then(response => response.json())
    .then(async data => {
            let calculSavant = 0.0;
            data.data.table.rows.forEach(async element => {
                let newData = new Date().getTime() * element.cells[0].distance.fromEarth.km
                calculSavant == 0.0 ? calculSavant = newData : calculSavant += newData
                calculSavant = calculSavant % 100000000000
            });
            returnValue = calculSavant;
        })
    .catch(err => {
        console.error(err);
    });
    return returnValue;
}

module.exports = {
    getRandomFromStars,
};
