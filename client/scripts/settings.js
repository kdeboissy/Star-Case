const darkThemeSwitchDom = document.getElementById('darkThemeSwitch');
const inventorySortingMethodDom = document.getElementById('inventorySortingMethod');
const reverseSortingInventoryDom = document.getElementById('reverseSortingInventory');

function setButtonSettings() {
    if (localStorage.getItem("theme") == "dark")
        darkThemeSwitchDom.checked = true;
    else
        darkThemeSwitchDom.checked = false;

    inventorySortingMethodDom.value = localStorage.getItem("inventorySortingMethod");

    if (localStorage.getItem("reverseInventorySorting") == "true")
        reverseSortingInventoryDom.checked = true;
    else
        reverseSortingInventoryDom.checked = false;

}

function switchTheme() {
    localStorage.setItem("theme", localStorage.getItem("theme") == "dark" ? "light": "dark");

    document.getElementsByTagName('html')[0].setAttribute("data-bs-theme", localStorage.getItem("theme"));
}

function switchSortingOrder() {
    localStorage.setItem("reverseInventorySorting", localStorage.getItem("reverseInventorySorting") == "true" ? "false": "true");
}

function switchSortingType()
{
    localStorage.setItem("inventorySortingMethod", inventorySortingMethodDom.value);
}

setButtonSettings();
