const inventory = [];

function sendTradeRequest(id)
{
    const errorDom = document.getElementById("errorMessage");
    const successDom = document.getElementById("successMessage");
    const loadingDom = document.getElementById("loadingBox");

    if (document.getElementById('wantedList') && document.getElementById('wantedList').querySelectorAll('.option-wanted')) {
      var temp = Array.from(document.getElementById('wantedList').querySelectorAll('.option-wanted').values()).map((item) => {return parseInt(item.value) != -1});

      for (let index = 0; index < temp.length; ++index) {
        const element = temp[index];

        if (!element) {
          return;
        }
      }
    }

    if (document.getElementById('giveList') && document.getElementById('giveList').querySelectorAll('.option-inventory')) {
      var temp =  Array.from(document.getElementById('giveList').querySelectorAll('.option-inventory').values()).map((item) => {return parseInt(item.value) != -1});

      for (let index = 0; index < temp.length; ++index) {
        const element = temp[index];

        if (!element) {
          return;
        }
      }
    }

    $("#sendTrade").modal('hide');

    requestAPIProtected(
        `/users/trade/${id}`, "POST", localStorage.getItem("authToken"),
        JSON.stringify({"itemWanted": document.getElementById('wantedList') && document.getElementById('wantedList').querySelectorAll('.option-wanted') ? Array.from(document.getElementById('wantedList').querySelectorAll('.option-wanted').values()).map((item) => {return parseInt(item.value)}) : [], "itemOffered": document.getElementById('giveList') && document.getElementById('giveList').querySelectorAll('.option-inventory') ? Array.from(document.getElementById('giveList').querySelectorAll('.option-inventory').values()).map((item) => {return parseInt(item.value)}) : []}),
        function (request) {}, errorDom, successDom, loadingDom);
}

function showSendTrade(id, username)
{
    document.getElementById('sendTradeLabel').innerText = `Trade - ${username}`;
    document.getElementById('sendButtonTradeReq').onclick = function () {sendTradeRequest(id)};
    $("#sendTrade").modal('show');

    document.getElementById('giveList').innerHTML = '';
    document.getElementById('wantedList').innerHTML = '';
}

function cacheInventory()
{
  const errorDom = document.getElementById("errorMessage");

  requestAPIProtected(
    `/user/inventory`, "GET", localStorage.getItem("authToken"),
    '',
    function (request) {
      while (inventory.length)
        inventory.pop();
      JSON.parse(request.responseText)["inventory"].forEach((item) => {
        inventory.push(item);
      });
    }, errorDom, document.createElement('div'), document.createElement('div'));

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

function showTrade(id, username)
{
    document.getElementById('acceptTradeLabel').innerText = `Trade - ${username}`;
    $("#acceptTrade").modal('show');
}

function addItemRowWanted()
{
  const wantedList = document.getElementById('wantedList');

  wantedList.innerHTML += `
<li class="d-flex list-group-item align-items-center justify-content-center">
  <select class="form-select option-wanted" style="width: 80%; border: 0; --bs-form-select-bg-img: none">
    <option value="-1" selected>Choose...</option>
    ${items.map((item) => {return `<option value="${item["itemDatas"].id}">${item["itemDatas"].name}</option>`} ).join()}
  </select>
  <span style="margin-left: auto">&times <strong>1</strong></span>
  <button class="btn" style="margin-left: auto" onclick="this.parentElement.remove();"><strong>✕</strong></button>
</li>
`;
}

function addItemRowInventory()
{
  const giveList = document.getElementById('giveList');

  giveList.innerHTML += `
<li class="d-flex list-group-item align-items-center justify-content-center">
  <select class="form-select option-inventory" style="width: 80%; border: 0; --bs-form-select-bg-img: none">
    <option value="-1" selected>Choose...</option>
    ${inventory.map((item) => {return `<option value="${item.id}">${item.name}</option>`} ).join()}
  </select>
  <span style="margin-left: auto">&times <strong>1</strong></span>
  <button class="btn" style="margin-left: auto" onclick="this.parentElement.remove();"><strong>✕</strong></button>
</li>
`;
}

function loadTrade()
{
    casesBtn.classList.remove("active");
    inventoryBtn.classList.remove("active");
    tradeBtn.classList.add("active");

    app.innerHTML = `
<div class="d-flex position-absolute" style="width: calc(100% - 280px - 1.5em); left: calc(280px + 1.5rem); top: 0;">
    <div class="alert alert-danger mt-3 position-relative"  hidden="true" style="width: 80%; margin-left:auto; margin-right: auto;" id="errorMessage"></div>
    <div class="alert alert-success mt-3 position-relative" hidden="true" style="position: absolute; width: 80%; margin-left:auto; margin-right: auto;" id="successMessage"></div>
    <div class="alert alert-secondary mt-3" style="display: none; width: 80%; margin-left:auto; margin-right: auto;" id="loadingBox">
        <div class="loading-dots"></div>
    </div>
</div>
<div class="d-flex flex-nowrap" style="width: 100%; height: 100%;">
  <div class="d-flex flex-column flex-shrink-0 p-3" style="width: 100%; height: 100vh;">
    <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <span class="fs-4" style="margin-left: 10px;">Requests</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto" id="tradeRequests">
    </ul>

    <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <span class="fs-4" style="margin-left: 10px;">User list</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto" id="tradeUsers">
    </ul>
    <hr>
  </div>
</div>
<div class="modal fade" id="sendTrade" tabindex="-1" aria-labelledby="sendTradeLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="sendTradeLabel">Trade - unknown</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h2 class="modal-title fs-5 mb-3">I Want:</h2>

        <ul class="list-group mb-3" id="wantedList">
        </ul>

        <div class="mb-3">
            <button class="btn btn-primary" onclick="addItemRowWanted();"><i class="fas fa-plus"></i></button>
        </div>


        <h2 class="modal-title fs-5 mb-3">I Give:</h2>

        <ul class="list-group mb-3" id="giveList">
        </ul>

        <div class="mb-3">
            <button class="btn btn-primary" onclick="addItemRowInventory();"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" id="sendButtonTradeReq">Send</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="acceptTrade" tabindex="-1" aria-labelledby="acceptTradeLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="acceptTradeLabel">Trade - unknown</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Refuse</button>
        <button type="button" class="btn btn-primary">Accept</button>
      </div>
    </div>
  </div>
</div>
`;

    const errorDom = document.getElementById("errorMessage");
    const successDom = document.getElementById("successMessage");
    const loadingDom = document.getElementById("loadingBox");
    const tradeDom = document.getElementById("tradeRequests");
    const tradeUsersDom = document.getElementById('tradeUsers');

    cacheInventory();

    requestAPIProtected(
        "/user/trade", "GET", localStorage.getItem("authToken"),
        '',
        function (request) {
            tradeDom.innerHTML = '';
            var json = JSON.parse(request.responseText)["trades"];
            Object.keys(json).forEach((element) => {
                var li = document.createElement('li');
                var a = document.createElement('a');
                var i = document.createElement('i');

                a.classList.add("nav-link", "link-body-emphasis");
                a.href = `javascript:showTrade(${element}, "${json[element]["username"].replaceAll('"', '\\"')}");`;
                i.classList.add("fas", "fa-user", "me-2");

                a.appendChild(i);
                a.innerHTML += json[element]["username"];
                li.appendChild(a);
                tradeDom.appendChild(li);
            });
        }, errorDom, document.createElement('div'), loadingDom);

        requestAPIProtected(
            "/users", "GET", localStorage.getItem("authToken"),
            '',
            function (request) {
                tradeUsersDom.innerHTML = '';
                var json = JSON.parse(request.responseText)["users"];
                Object.keys(json).forEach((element) => {
                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    var i = document.createElement('i');

                    a.classList.add("nav-link", "link-body-emphasis");
                    a.href = `javascript:showSendTrade(${element}, "${json[element].replaceAll('"', '\\"')}");`;
                    i.classList.add("fas", "fa-user", "me-2");

                    a.appendChild(i);
                    a.innerHTML += json[element];
                    li.appendChild(a);
                    tradeUsersDom.appendChild(li);
                });
            }, errorDom, document.createElement('div'), loadingDom);
}
