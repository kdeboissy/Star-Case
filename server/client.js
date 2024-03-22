const axios = require('axios');

const options = {
    method: 'POST',
    url: 'http://localhost:8082/users/new',
    params: { 'api-version': '3.0' },
    headers: {
        'content-type': 'application/json',
    },
    data: {
        username: 'testuse23r',
        email: 'Jean@gmaila.com',
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
