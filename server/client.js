const axios = require('axios');

const options = {
    method: 'POST',
    url: 'http://localhost:8082/users/login',
    params: { 'api-version': '3.0' },
    headers: {
        'content-type': 'application/json',
    },
    data: {
        // username: 'test',
        email: 'Jean@test.com',
        password: 'testpass'
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
