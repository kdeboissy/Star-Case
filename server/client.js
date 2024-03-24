const axios = require('axios');

const options = {
    method: 'POST',
    url: 'http://localhost:8082/users/trade/1',
    params: { 'api-version': '3.0' },
    headers: {
        'content-type': 'application/json',
        'authorization': 'eyJhbGciOiJIUzI1NiJ9.SmVhbkBnbWFpbGEuY29tOjE3MTExODkwNTUwMzg6JDJiJDEwJEZkZjhWdXlmMldmVmtjb2QzSGRCaU96L25MMFBCMmQ3Ynp1WHJJOUlJWE9rdkR6THpGUngu.vI0ZUjv4Q_70kWivOtge5QZA7EjdNqtMgIjLlfCSahI'
    },
    data: {
        itemWanted: [],
        itemOffered: [0, 1, 0]
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
