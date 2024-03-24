const app = document.getElementById('app');
const casesBtn = document.getElementById('casesBtn');
const inventoryBtn = document.getElementById('inventoryBtn');
const tradeBtn = document.getElementById('tradeBtn');

const items = [];
const particlesArray = [];

let oldAnimation;

let canvas;
let context;

let cycles = 0;
let box = 0;

class Particle {
  constructor(x, y, context, color, speedX, speedY, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.context = context;
  }

  draw() {
    //arc
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

    this.context.fillStyle = this.color;
    this.context.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += -1 * this.speedY;
  }
}

const drawParticles = () => {
  particlesArray.forEach((particle) => {
    particle.draw();
  });
};

const updateParticles = () => {
  particlesArray.forEach((particle) => {
    particle.update();
  });
};

const createParticles = (x, y, context, color, speedX, speedY, radius) => {
  for (let i = 0; i < 10; i++) {
    const particle = new Particle(x, y, context, color, speedX, speedY, radius);
    particlesArray.push(particle);
  }
};

const animate = (context, canvas) => {
  oldAnimation = requestAnimationFrame(function () {animate(context, canvas)});


  context.fillStyle = "rgba(0, 0, 0, 0.25)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  cycles = (cycles + 1) % 50;

  if (cycles == 49) {
    if (getRandInt(0, 1)) {
        var x = getRandInt(0, canvas.width);
        var y = canvas.height;
    } else {
        var y = getRandInt(0, canvas.height);
        var x = 0;
    }
    createParticles(x, y, context, `rgb(230, 230, 230)`, 0.1, 0.1, 1);
  }

  drawParticles();
  updateParticles();
};

function startParticleBackground()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = canvas.parentElement.getBoundingClientRect().width;
    canvas.height = canvas.parentElement.getBoundingClientRect().height;

    if (oldAnimation)
        cancelAnimationFrame(oldAnimation);

    while (particlesArray.length)
        particlesArray.pop()

    for (let index = 0; index < 100; ++index) {
        var x = getRandInt(0, canvas.width);
        var y = getRandInt(0, canvas.height);
        createParticles(x, y, context, `rgb(230, 230, 230)`, 0.1, 0.1, 1);
    }

    animate(context, canvas);

    window.addEventListener("resize", () => {
        canvas.width = canvas.parentElement.getBoundingClientRect().width;
        canvas.height = canvas.parentElement.getBoundingClientRect().height;
    });
}

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
            var srcTemp = items[getRandInt(0, 10000000) % items.length]["itemDatas"].path;

            if (!images[srcTemp])
                preload(srcTemp);

            item.innerHTML = `<img src=${srcTemp} style="width: 80%;">`;
        });

        sleep(2500).then(() => {
            let rect;
            let shift = 0;

            roulette.style.display = "flex";
            rect = roulette.getBoundingClientRect();

            let [x, y] = [rect.width / 2 - 803 * (15 - 803 / 100) + rect.left, rect.height / 2 + rect.top];
            let find = false;
            document.querySelectorAll('.item-btn').forEach((item) => {
                var tempRect = item.getBoundingClientRect();

                if (tempRect.left <= x && tempRect.top <= y && tempRect.left + tempRect.width >= x && tempRect.top + tempRect.height >= y) {
                    item.innerHTML = `<img src=${json.path} style="width: 80%;">`;
                    shift = (tempRect.left + tempRect.width / 2) - x;
                    find = true;
                }
            });

            if (!find) {
                document.querySelectorAll('.item-btn').forEach((item) => {
                    var tempRect = item.getBoundingClientRect();

                    if (tempRect.left <= x && tempRect.top <= y && tempRect.left + tempRect.width * 2 >= x && tempRect.top + tempRect.height >= y) {
                        item.innerHTML = `<img src=${json.path} style="width: 80%;">`;
                        shift = (tempRect.left + tempRect.width / 2) - x;
                        find = true;
                    }
                });
            }

            const itemGet = document.getElementById('itemGet');

            itemGet.querySelector(".img-get").src = json.path;
            itemGet.querySelector(".name-get").innerText = json.name;
            itemGet.querySelector(".rarity-get").innerText = json.rarity;
            for (let index = 0; index < items.length; ++index) {
                if (items[index].itemDatas.name == json.name)
                    itemGet.style.color = items[index].itemColor;
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
                        itemGet.style.display = "flex";
                        sleep(2500).then(() => {
                            itemGet.style.display = "none";
                            theCase.onclick = openCase;
                        });
                    });
                }
                document.querySelectorAll('.item-btn').forEach((item) => {
                    item.style.transform = `translateX(${i * (15 - i / 100) - shift}px)`;
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
<div id="itemGet" class="item-get flex-column position-absolute align-items-center justify-content-center" style="display: none">
    <img src="/assets/rondoudou_francais.jpg" class="img-get" style="height: 50%;">
    <h1 class="mt-5 name-get">unknown</h1>
    <h4 class="mt-1 rarity-get">(Commun)</h2>
</div>
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
<div style="width: 98%; height: 98%; border-radius: 20px;">
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

    <canvas class="position-absolute" style="border-radius: 20px; left: calc(1% + 280px + 1.5em); top: 1%; z-index: -15;" height="600" width="600" id="canvas">
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

startParticleBackground();
}
