document.addEventListener("DOMContentLoaded", function () {
  const purchaseBtn = document.getElementById("purchase-btn");
  const changeDueDiv = document.getElementById("change-due");
  const cashInput = document.getElementById("cash");
  const totalElement = document.getElementById("total");
  // Ensure 'price' is accessible throughout the script
  let price = 19.5; // Example price, adjust as necessary based on your application logic
  const cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ];

  function updateTotalDisplay() {
    totalElement.textContent = `Total: $${price.toFixed(2)}`;
  }

  updateTotalDisplay();

  purchaseBtn.addEventListener("click", function () {
    const cash = parseFloat(cashInput.value);
    let changeDue = cash - price;

    if (isNaN(cash) || cash < price) {
      alert("Customer does not have enough money to purchase the item.");
      return;
    } else if (cash === price) {
      changeDueDiv.innerHTML = "No change due - customer paid with exact cash.";
      return;
    }

    const changeGiven = calculateChange(changeDue, cid);
    if (!changeGiven) {
      changeDueDiv.innerHTML = "Status: INSUFFICIENT_FUNDS";
      return;
    } else if (changeGiven.changeDue > 0) {
      changeDueDiv.innerHTML = "Status: INSUFFICIENT_FUNDS";
      return;
    } else {
      let displayText = `Status: ${changeGiven.status}<br>`;
      changeGiven.change.forEach(([denom, amount]) => {
        displayText += `${denom}: $${amount.toFixed(2)}<br>`;
      });
      changeDueDiv.innerHTML = displayText;
    }
  });

  function calculateChange(changeDue, cid) {
    let status = "OPEN";
    const currencyUnitValues = [
      ["ONE HUNDRED", 100.0],
      ["TWENTY", 20.0],
      ["TEN", 10.0],
      ["FIVE", 5.0],
      ["ONE", 1.0],
      ["QUARTER", 0.25],
      ["DIME", 0.1],
      ["NICKEL", 0.05],
      ["PENNY", 0.01],
    ];
    let totalCID = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);
    let change = [];
    if (changeDue > totalCID) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    if (changeDue.toFixed(2) === totalCID) {
      status = "CLOSED";
      change = cid;
    } else {
      currencyUnitValues.forEach(([unit, value]) => {
        let amountInDrawer = cid.find((elem) => elem[0] === unit)[1];
        let amountToReturn = 0;
        while (changeDue >= value && amountInDrawer >= value) {
          changeDue -= value;
          amountInDrawer -= value;
          amountToReturn += value;
          changeDue = Math.round(changeDue * 100) / 100;
        }
        if (amountToReturn > 0) {
          change.push([unit, amountToReturn]);
        }
      });
    }

    return { status, change };
  }
});
