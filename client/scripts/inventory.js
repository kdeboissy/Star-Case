const cacheInventoryTab = {};

function showBigObject(id)
{
    obj = cacheInventoryTab[id];

    const itemBig = document.getElementById('itemBig');

    itemBig.querySelector('.img-get').src = obj.path;
    itemBig.querySelector('.name-get').innerText = obj.name;
    itemBig.querySelector('.rarity-get').innerText = obj.rarity;
    itemBig.style.color = obj.color;

    itemBig.style.display = "flex";
}

function getRarityCode(rarity)
{
    if (rarity == "Commun")
        return (0);
    if (rarity == "Rare")
        return (1);
    if (rarity == "Epique")
        return (2);
    if (rarity == "Legendaire")
        return (3);
    if (rarity == "Mythique")
        return (4);
    return (-1);
}

function loadInventory()
{
    casesBtn.classList.remove("active");
    inventoryBtn.classList.add("active");
    tradeBtn.classList.remove("active");

    app.innerHTML = `
<div onclick="this.style.display = 'none';" id="itemBig" class="item-get flex-column position-absolute align-items-center justify-content-center" style="display: none; z-index: 60; cursor: pointer;">
    <img src="/assets/rondoudou_francais.jpg" class="img-get" style="height: 50%;">
    <h1 class="mt-5 name-get">unknown</h1>
    <h4 class="mt-1 rarity-get">(Commun)</h2>
</div>
<div class="d-flex position-absolute" style="width: calc(100% - 280px - 1.5em); left: calc(280px + 1.5rem); top: 0;">
    <div class="alert alert-danger mt-3 position-relative"  hidden="true" style="width: 80%; margin-left:auto; margin-right: auto;" id="errorMessage"></div>
    <div class="alert alert-success mt-3 position-relative" hidden="true" style="position: absolute; width: 80%; margin-left:auto; margin-right: auto;" id="successMessage"></div>
    <div class="alert alert-secondary mt-3" style="display: none; width: 80%; margin-left:auto; margin-right: auto;" id="loadingBox">
        <div class="loading-dots"></div>
    </div>
</div>
<div id="inventoryTiles" class="d-flex flex-row align-items-top justify-content-center mb-auto" style="width: 100%; max-height: 100%; height: fit-content; overflow-y: scroll; flex-wrap: wrap !important;">
</div>
`;
    const errorDom = document.getElementById("errorMessage");
    const inventory = document.getElementById('inventoryTiles');

    requestAPIProtected(
        `/user/inventory`, "GET", localStorage.getItem("authToken"),
        '',
        function (request) {
        var json = JSON.parse(request.responseText)["inventory"];

        if (localStorage.getItem("inventorySortingMethod") == "name")
            json = json.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return (0);
            });
        if (localStorage.getItem("inventorySortingMethod") == "id")
            json = json.sort((a, b) => {
                if (a.id > b.id) {
                    return 1;
                }
                if (a.id < b.id) {
                    return -1;
                }
                return (0);
            });
        if (localStorage.getItem("inventorySortingMethod") == "rarity") {
            json = json.sort((a, b) => {
                if (getRarityCode(a.rarity) > getRarityCode(b.rarity)) {
                    return 1;
                }
                if (getRarityCode(a.rarity) < getRarityCode(b.rarity)) {
                    return -1;
                }
                return (0);
            });
        }

        if (localStorage.getItem("reverseInventorySorting") == "true")
            json = json.reverse();
        inventory.innerHTML = '';
        json.forEach((item) => {
            if (!cacheInventoryTab[item.id])
                cacheInventoryTab[item.id] = item;
            if (!images[item.path])
                preload(item.path);
            var temp = document.createElement('div');
            var image = document.createElement('img');

            image.src = item.path;
            image.style.width = "80%";
            temp.classList.add("d-flex", "position-relative", "align-items-center", "justify-content-center", "m-2", "inventory-btn");
            temp.appendChild(image);
            temp.onclick = function () {showBigObject(item.id)};
            inventory.appendChild(temp);
        });
    }, errorDom, document.createElement('div'), document.createElement('div'));
}
