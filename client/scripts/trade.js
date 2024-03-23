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
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <span class="fs-4" style="margin-left: 10px;">Requests</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto" id="tradeRequests">
    </ul>

    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <span class="fs-4" style="margin-left: 10px;">User list</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto" id="tradeUsers">
      <li class="nav-item">
        <a id="casesBtn" href="javascript:acceptTrade();" class="nav-link link-body-emphasis" aria-current="page">
            <i class="fas fa-user me-2"></i>
            test
        </a>
      </li>
      <li>
        <a id="inventoryBtn" href="javascript:acceptTrade();" class="nav-link link-body-emphasis">
            <i class="fas fa-user me-2"></i>
            test2
        </a>
      </li>
      <li>
        <a id="tradeBtn" href="javascript:acceptTrade();" class="nav-link link-body-emphasis">
            <i class="fas fa-user me-2"></i>
            test3
        </a>
      </li>
    </ul>
    <hr>
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
                a.href = `javascript:acceptTrade(${element});`;
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
                    a.href = `javascript:sendTrade(${element});`;
                    i.classList.add("fas", "fa-user", "me-2");

                    a.appendChild(i);
                    a.innerHTML += json[element];
                    li.appendChild(a);
                    tradeUsersDom.appendChild(li);
                });
            }, errorDom, document.createElement('div'), loadingDom);
}
