function showSendTrade(id, username)
{
    document.getElementById('sendTradeLabel').innerText = `Trade - ${username}`;
    $("#sendTrade").modal('show');
}

function showTrade(id, username)
{
    document.getElementById('acceptTradeLabel').innerText = `Trade - ${username}`;
    $("#acceptTrade").modal('show');
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
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Send</button>
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

    requestAPIProtected(
        "/trade", "GET", localStorage.getItem("authToken"),
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
