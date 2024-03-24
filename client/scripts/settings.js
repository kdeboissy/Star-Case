const darkThemeSwitchDom = document.getElementById('darkThemeSwitch');

function setButtonSettings() {
    console.log()
    if (localStorage.getItem("theme") == "dark")
        darkThemeSwitchDom.checked = true;
    else
        darkThemeSwitchDom.checked = false;
}

function switchTheme() {
    localStorage.setItem("theme", localStorage.getItem("theme") == "dark" ? "light": "dark");

    document.getElementsByTagName('html')[0].setAttribute("data-bs-theme", localStorage.getItem("theme"));
}

setButtonSettings();
