const mailDom = document.getElementById("mail");
const passwordDom = document.getElementById("password");
const errorDom = document.getElementById("errorMessage");
const successDom = document.getElementById("successMessage");
const loadingDom = document.getElementById("loadingBox");

const paramsURL = getQueryParams(document.URL);
const redirect = paramsURL && paramsURL.redirect ? paramsURL.redirect + '?' + ((document.URL.match(/\?/g) || []).length < 2 ? '' : document.URL.substring(document.URL.indexOf('?')+1 + document.URL.substring( document.URL.indexOf('?')+1 ).indexOf('?') + 1)) : null;

function login()
{
    requestAPIPublic(
        "/api/login", "POST",
        "email=${mailDom.value}&password=${passwordDom.value}",
        function (request) {
            localStorage.setItem("authToken", JSON.parse(request.responseText)["token"]);
            window.location.href = redirect ? redirect : '/pages/starcase';
        }, errorDom, successDom, loadingDom);
}

if (localStorage.getItem("authToken")) {
    window.location.href = redirect ? redirect : '/pages/starcase';
}