const app = document.getElementById('app');
const casesBtn = document.getElementById('casesBtn');
const inventoryBtn = document.getElementById('inventoryBtn');
const tradeBtn = document.getElementById('tradeBtn');

let box = 0;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function openCase()
{
    let theCase = document.getElementById("theCase");
    let roulette = document.getElementById("roulette");
    roulette.style.display = "none";

    theCase.classList.add('the-case-animated');
    theCase.classList.remove('the-case');
    theCase.classList.add('the-case-animation-0');

    sleep(2500).then(() => {
        roulette.style.display = "flex";
        let i = 0;

        theCase.classList.remove('the-case-animation-0');

        var interval = setInterval(function () {
            ++i;
            if (i >= 803) {
                theCase.classList.remove('the-case-animated');
                theCase.classList.add('the-case');
                clearInterval(interval);

                sleep(1500).then(() => {
                    roulette.style.display = "none";
                });
            }
            document.querySelectorAll('.item-btn').forEach((item) => {
                item.style.transform = `translateX(${i * (15 - i / 100)}px)`;
            });
        }, 10);
    });
}

function switchCase(i)
{
    box = i;

    document.getElementById('theCase').src = `/assets/box${box}.png`;
}

function loadCases()
{
    casesBtn.classList.add("active");
    inventoryBtn.classList.remove("active");
    tradeBtn.classList.remove("active");

    box = 0;

    app.innerHTML = `

<div class="roulette position-absolute align-items-center justify-content-center" style="display: none;" id="roulette">
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
        <div class="d-flex position-relative align-items-center justify-content-center m-2 box-btn" onclick="switchCase(0);">
            <img src="/assets/box0.png" style="width: 100%;"/>
        </div>
        <div class="d-flex position-relative align-items-center justify-content-center m-2 box-btn" onclick="switchCase(1);">
            <img src="/assets/box1.png" style="width: 100%;"/>
        </div>
        <div class="d-flex position-relative align-items-center justify-content-center m-2 box-btn" onclick="switchCase(2);">
            <img src="/assets/box2.png" style="width: 100%;"/>
        </div>
        <div class="d-flex position-relative m-2 box-btn"></div>
    </div>

    <div class="d-flex align-items-center justify-content-center" style="overflow-y: hidden; width: 100%; height: 100%;">
        <img src="/assets/box0.png" class="the-case" id="theCase" onclick="openCase();"/>
    </div>
</div>
`;
}
