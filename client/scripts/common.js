API_URL = "http://localhost:8082"

function getQueryParams(url)
{
    url = url.split('+').join(' ').split('?')[1];

    if (!url)
        return (null);

    url = url.split('&');

    var params = {};

    for (let index = 0; index < url.length; ++index) {
        const element = url[index];
        params[element.split('=')[0]] = element.split('=')[1];
    }

    return params;
}

function handleCodes(request, callback, errorDom, successDom, loadingDom)
{
    if (request.status === 200 || request.status === 201) {
        successDom.hidden = false;
        loadingDom.style.display = 'none';
        successDom.innerText = "Success."

        callback(request);

    } else if (request.status === 403) {
        errorDom.hidden = false;
        loadingDom.style.display = 'none';
        errorDom.innerText = "Invalid password or mail."

    } else if (request.status === 409) {
        errorDom.hidden = false;
        loadingDom.style.display = 'none';
        errorDom.innerText = "Data already exist."

    } else if (request.status === 500) {
        errorDom.hidden = false;
        loadingDom.style.display = 'none';
        errorDom.innerText = "Internal server error."

    } else if (request.status !== 200) {
        errorDom.hidden = false;
        loadingDom.style.display = 'none';
        errorDom.innerText = "Unexpected error.";
    }
}

function requestAPIPublic(route, method, body, callback, errorDom, successDom, loadingDom)
{
    var request = (window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"));

    successDom.hidden = true;
    errorDom.hidden = true;
    loadingDom.style.display = 'block';

    request.open(method, API_URL + route, 1);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE)
            handleCodes(request, callback, errorDom, successDom, loadingDom);
      };
      request.onerror = () => {
        errorDom.hidden = false;
        loadingDom.style.display = 'none';
        errorDom.innerText = "Request failed (the server may be down).";
    };
    request.send(body);
}

function requestAPIProtected(route, method, token, body, callback, errorDom, successDom, loadingDom)
{
    var request = (window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"));

    if (!token)
        window.location.reload();

    successDom.hidden = true;
    errorDom.hidden = true;
    loadingDom.style.display = 'block';

    request.open(method, API_URL + route, 1);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Authorization", token);
    request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE)
            handleCodes(request, callback, errorDom, successDom, loadingDom);
      };
      request.onerror = () => {
        errorDom.hidden = false;
        loadingDom.style.display = 'none';
        errorDom.innerText = "Request failed (the server may be down).";
    };
    request.send(body);
}

if (!localStorage.getItem("theme"))
    localStorage.setItem("theme", "light");

document.getElementsByTagName('html')[0].setAttribute("data-bs-theme", localStorage.getItem("theme"));
