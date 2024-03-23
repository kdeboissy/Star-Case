function pingApi(callback) {
    var d = (window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"));

    d.open("GET", API_URL + '/user', 1);
    d.onreadystatechange = () => {
        if (d.readyState === XMLHttpRequest.DONE && d.status !== 0) {
            callback();
        }
    };
    d.onerror = () => { };
    d.send();
}

function redirectRoot()
{
    window.location.href = '/';
}

var interval = setInterval(function () { pingApi(redirectRoot)}, 5000);
