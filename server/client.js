const axios = require('axios');

const options = {
    method: 'GET',
    url: 'http://localhost:8082/user/inventory',
    params: { 'api-version': '3.0' },
    headers: {
        'content-type': 'application/json',
        'authorization': 'eyJhbGciOiJIUzI1NiJ9.SmVhbkB0ZXN0LmNvbToxNzExMTk2NTk5MTQzOiQyYiQxMCRGZGY4VnV5ZjJXZlZrY29kM0hkQmlPRHJOdmVpS0RCMjM4bzJpZlR2OGZWRlVQeEFXNW43Rw.ffgp7UKfmwBdX4Uao-jlhMCCRzzQeHKlAaQ7PziM9KM'
    },
    data: {}
};

axios
    .request(options)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
