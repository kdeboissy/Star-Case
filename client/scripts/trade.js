function loadTrade()
{
    casesBtn.classList.remove("active");
    inventoryBtn.classList.remove("active");
    tradeBtn.classList.add("active");

    app.innerHTML = `
<div class="d-flex flex-nowrap" style="width: 100%; height: 100%;">
  <div class="d-flex flex-column flex-shrink-0 p-3" style="width: 100%; height: 100vh;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <span class="fs-4" style="margin-left: 10px;">Requests</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
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

    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <span class="fs-4" style="margin-left: 10px;">User list</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
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
}
