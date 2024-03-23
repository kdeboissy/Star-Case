function verifyToken(callback, otherCallback) {
    var token = localStorage.getItem("authToken");

    if (!token)
        return callback();

    var d = (window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"));

    d.open("GET", API_URL + '/user', 1);
    d.setRequestHeader("Authorization", token);
    d.onreadystatechange = () => {
        if (d.readyState === XMLHttpRequest.DONE && d.status === 200) {
            localStorage.setItem("username", JSON.parse(d.responseText)["username"]);
            return;
        } else if (d.readyState === XMLHttpRequest.DONE && d.status === 401) {
            return callback();
        } else if (d.readyState === XMLHttpRequest.DONE) {
        }
      };
    d.onerror = () => {
        otherCallback();
    };
    d.send();
}

function maintenance() {
    window.location.href = '/pages/maintenance';
}

function invalidateToken() {
    if (localStorage.getItem("authToken"))
        localStorage.removeItem("authToken");
    if (localStorage.getItem("username"))
        localStorage.removeItem("username");

    window.location.href = `/pages/login?redirect=${window.location.href}`;
}

verifyToken(invalidateToken, maintenance);

if (!localStorage.getItem("authToken"))
    window.location.href = `/pages/login?redirect=${window.location.href}`;
