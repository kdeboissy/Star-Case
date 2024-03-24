const app = document.getElementById('app');
const casesBtn = document.getElementById('casesBtn');
const inventoryBtn = document.getElementById('inventoryBtn');
const tradeBtn = document.getElementById('tradeBtn');

const items = [];

let box = 0;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function getRandInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openCase()
{
    const errorDom = document.getElementById('errorMessage');
    let theCase = document.getElementById("theCase");
    let roulette = document.getElementById("roulette");
    roulette.style.display = "none";

    theCase.classList.add('the-case-animated');
    theCase.classList.remove('the-case');
    theCase.onclick = "";
    theCase.classList.add('the-case-animation-0');

    document.querySelectorAll('.item-btn').forEach((item) => {
        item.style.transform = `translateX(0px)`;
    });

    requestAPIProtected(
        `/opencase`, "GET", localStorage.getItem("authToken"),
        '',
        function (request) {
        json = JSON.parse(request.responseText)["item"];

        document.querySelectorAll('.item-btn').forEach((item) => {
            item.innerHTML = `<img src=${items[getRandInt(0, 10000000) % items.length]["itemDatas"].path} style="width: 80%;">`;
        });

        sleep(2500).then(() => {
            let rect;

            roulette.style.display = "flex";
            rect = roulette.getBoundingClientRect();

            let [x, y] = [rect.width / 2 - 803 * (15 - 803 / 100) + rect.left, rect.height / 2 + rect.top];
            let find = false;
            document.querySelectorAll('.item-btn').forEach((item) => {
                var tempRect = item.getBoundingClientRect();

                if (tempRect.left <= x && tempRect.top <= y && tempRect.left + tempRect.width >= x && tempRect.top + tempRect.height >= y) {
                    item.innerHTML = `<img src=${json.path} style="width: 80%;">`;
                    find = true;
                }
            });

            if (!find) {
                document.querySelectorAll('.item-btn').forEach((item) => {
                    var tempRect = item.getBoundingClientRect();

                    if (tempRect.left <= x && tempRect.top <= y && tempRect.left + tempRect.width * 2 >= x && tempRect.top + tempRect.height >= y) {
                        item.innerHTML = `<img src=${json.path} style="width: 80%;">`;
                        find = true;
                    }
                });
            }

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
                        theCase.onclick = openCase;
                    });
                }
                document.querySelectorAll('.item-btn').forEach((item) => {
                    item.style.transform = `translateX(${i * (15 - i / 100)}px)`;
                });
            }, 10);
        });
    }, errorDom, document.createElement('div'), document.createElement('div'));
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
    <div class="position-absolute" style="align-self: end; margin-bottom: 20px; width: 10px; height: 10px; color: red;"><i class="fas fa-chevron-up" style="color: #fff;"></i></div>
    <div class="roulette-container position-relative d-flex align-items-center justify-content-end">
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
        <div class="position-relative m-2 item-btn align-items-center justify-content-center d-flex"></div>
    </div>
</div>
<div style="width: 98%; height: 98%; background: black; border-radius: 20px;">
    <div class="d-flex position-absolute" style="width: calc(100% - 280px - 1.5em); left: calc(280px + 1.5rem);">
        <div class="alert alert-danger mt-3 position-relative" hidden="true" style="width: 80%; margin-left:auto; margin-right: auto;" id="errorMessage"></div>
        <div class="alert alert-success mt-3 position-relative" hidden="true" style="position: absolute; width: 80%; margin-left:auto; margin-right: auto;" id="successMessage"></div>
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

const errorDom = document.getElementById('errorMessage');

requestAPIProtected(
    `/items`, "GET", localStorage.getItem("authToken"),
    '',
    function (request) {
      while (items.length)
        items.pop();
      JSON.parse(request.responseText)["items"].forEach((item) => {
        items.push(item);
    });
}, errorDom, document.createElement('div'), document.createElement('div'));
}
