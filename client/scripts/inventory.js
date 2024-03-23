function loadInventory()
{
    casesBtn.classList.remove("active");
    inventoryBtn.classList.add("active");
    tradeBtn.classList.remove("active");

    app.innerHTML = `
<div class="d-flex position-absolute" style="width: calc(100% - 280px - 1.5em); left: calc(280px + 1.5rem); top: 0;">
    <div class="alert alert-danger mt-3 position-relative"  hidden="true" style="width: 80%; margin-left:auto; margin-right: auto;" id="failBox"></div>
    <div class="alert alert-success mt-3 position-relative" hidden="true" style="position: absolute; width: 80%; margin-left:auto; margin-right: auto;" id="successBox"></div>
    <div class="alert alert-secondary mt-3" style="display: none; width: 80%; margin-left:auto; margin-right: auto;" id="loadingBox">
        <div class="loading-dots"></div>
    </div>
</div>
<div class="d-flex flex-row align-items-top justify-content-center mb-auto" style="width: 100%; max-height: 100%; height: fit-content; overflow-y: scroll; flex-wrap: wrap !important;">
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
    <div class="d-flex position-relative m-2 inventory-btn"></div>
</div>
`;
}
