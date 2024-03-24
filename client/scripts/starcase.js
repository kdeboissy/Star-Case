const nameDom = document.getElementById('username')
const images = {};

function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[preload.arguments[i]] = new Image();
        images[preload.arguments[i]].src = preload.arguments[i];
    }
}

preload(
    "/assets/box0.png",
    "/assets/box1.png",
    "/assets/box2.png",
    "/assets/box3.png"
)

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
