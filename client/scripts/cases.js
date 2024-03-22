const app = document.getElementById('app');
const casesBtn = document.getElementById('casesBtn');
const inventoryBtn = document.getElementById('inventoryBtn');
const tradeBtn = document.getElementById('tradeBtn');

function loadCases()
{
    casesBtn.classList.add("active");
    inventoryBtn.classList.remove("active");
    tradeBtn.classList.remove("active");

    app.innerHTML = `
<div style="width: 98%; height: 98%; background: black; border-radius: 20px;"></div>
`;
}
