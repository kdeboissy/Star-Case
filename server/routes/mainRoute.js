async function mainRoute(req, res)
{
    if (req.method !== 'GET')
        return res.status(405).send({ message: 'Please use GET method' });
    return res.status(200).send({ message: 'Welcome on StarCase API!' });
}

module.exports = {
    mainRoute
};
