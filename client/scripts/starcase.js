const nameDom = document.getElementById('username')

function logout()
{
    localStorage.removeItem("authToken");
    window.location.href = '/';
}

if (!localStorage.getItem("username")) {
    var interval = setInterval(function () {
        if (localStorage.getItem("username")) {
            nameDom.innerText = localStorage.getItem('username');
            clearInterval(interval);
        }
    }, 200);
}

nameDom.innerText = localStorage.getItem('username');
