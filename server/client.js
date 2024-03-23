const axios = require('axios');

const options = {
    method: 'POST',
    url: 'http://localhost:8082/users/register',
    params: { 'api-version': '3.0' },
    headers: {
        'content-type': 'application/json',
    },
    data: {
        username: 'testusae23r',
        email: 'Jean@gmokaila.com',
        password: 'testpassword'
    }
};

axios
    .request(options)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
