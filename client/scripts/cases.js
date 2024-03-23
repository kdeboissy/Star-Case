const app = document.getElementById('app');
const casesBtn = document.getElementById('casesBtn');
const inventoryBtn = document.getElementById('inventoryBtn');
const tradeBtn = document.getElementById('tradeBtn');

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function openCase()
{
    let theCase = document.getElementById("theCase");

    theCase.classList.add('the-case-animated');
    theCase.classList.remove('the-case');
    theCase.classList.add('the-case-animation-0');

    sleep(2500).then(() => {
        theCase.classList.remove('the-case-animated');
        theCase.classList.add('the-case');
        theCase.classList.remove('the-case-animation-0');

        let i = 0;

        var interval = setInterval(function () {
            ++i;
            if (i >= 803)
                return clearInterval(interval);
            document.querySelectorAll('.item-btn').forEach((item) => {
                item.style.transform = `translateX(${i * (15 - i / 100)}px)`;
            });
        }, 10);
    });
}

function loadCases()
{
    casesBtn.classList.add("active");
    inventoryBtn.classList.remove("active");
    tradeBtn.classList.remove("active");

    app.innerHTML = `

<div class="roulette d-flex position-absolute align-items-center justify-content-center">
    <div class="position-absolute" style="margin-top: 10%; width: 10px; height: 10px; color: red;">^</div>
    <div class="roulette-container position-relative d-flex align-items-center justify-content-end">
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
        <div class="position-relative m-2 item-btn"></div>
    </div>
</div>
<div style="width: 98%; height: 98%; background: black; border-radius: 20px;">
    <div class="d-flex position-absolute" style="width: calc(100% - 280px - 1.5em); left: calc(280px + 1.5rem);">
        <div class="alert alert-danger mt-3 position-relative" hidden="true" style="width: 80%; margin-left:auto; margin-right: auto;" id="failBox"></div>
        <div class="alert alert-success mt-3 position-relative" hidden="true" style="position: absolute; width: 80%; margin-left:auto; margin-right: auto;" id="successBox"></div>
        <div class="alert alert-secondary mt-3" style="display: none; width: 80%; margin-left:auto; margin-right: auto;" id="loadingBox">
            <div class="loading-dots"></div>
        </div>
    </div>

    <div class="d-flex align-items-center justify-content-center position-absolute" style="width: calc(100% - 280px - 1.5em); left: calc(280px + 1.5rem); height: 100px">
        <div class="d-flex position-relative align-items-center justify-content-center m-2 box-btn">
            <img src="/assets/box0.png" style="width: 100%;"/>
        </div>
        <div class="d-flex position-relative m-2 box-btn"></div>
        <div class="d-flex position-relative m-2 box-btn"></div>
        <div class="d-flex position-relative m-2 box-btn"></div>
    </div>

    <div class="d-flex align-items-center justify-content-center" style="overflow-y: hidden; width: 100%; height: 100%;">
        <img src="/assets/box0.png" class="the-case" id="theCase" onclick="openCase();"/>
    </div>
</div>
`;
}
