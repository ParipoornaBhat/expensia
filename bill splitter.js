let peopleNames = [];
let foodPrices = {};
let sharedAmounts = {};

function createTable() {
  const numPeople = document.getElementById("numPeople").value;

  let foodDetailsHTML = "<h2>Food Details:</h2>";
  foodDetailsHTML += "<table>";
  foodDetailsHTML += "<tr><th>Food Name</th>";
  foodDetailsHTML += "<th>Food Price</th>";
  const foodNames = [];

  for (let i = 0; i < numPeople; i++) {
    const personName = prompt(`Enter name for person ${i + 1}:`);
    peopleNames.push(personName);
    foodDetailsHTML += `<th>${personName}</th>`;
  }

  foodDetailsHTML += "</tr>";

  const numFoods = parseInt(prompt("Enter the number of food items:"));

  for (let i = 0; i < numFoods; i++) {
    const foodName = prompt(`Enter name for food ${i + 1}:`);
    foodNames.push(foodName);
    const foodPrice = parseFloat(prompt(`Enter price for ${foodName}:`));
    foodPrices[foodName] = foodPrice;
    foodDetailsHTML += `<tr><td>${foodName}</td>`;
    foodDetailsHTML += `<td>${foodPrice}</td>`;
    for (let j = 0; j < numPeople; j++) {
      foodDetailsHTML += `<td><input type="checkbox" name="${foodName}-${j}" value="${foodName}" onclick="updateBills()"></td>`;
    }

    foodDetailsHTML += "</tr>";
  }

  foodDetailsHTML += "</table>";
  document.getElementById("foodDetails").innerHTML = foodDetailsHTML;

  let billDetailsHTML = "<h2>Bill Details:</h2>";
  billDetailsHTML += "<table>";
  billDetailsHTML += "<tr><th>Name</th><th>Total Bill</th></tr>";

  for (let i = 0; i < numPeople; i++) {
    const personName = peopleNames[i];
    billDetailsHTML += `<tr><td>${personName}</td><td id="${personName.toLowerCase()}Bill">$0.00</td></tr>`;
  }

  billDetailsHTML += "</table>";
  document.getElementById("billDetails").innerHTML = billDetailsHTML;

  document.getElementById("foodDetails").style.display = "block";
  document.getElementById("billDetails").style.display = "block";
}

function updateBills() {
  let checkedCounts = {};

  for (let foodName in foodPrices) {
    checkedCounts[foodName] = 0;
  }

  for (let foodName in foodPrices) {
    for (let i = 0; i < peopleNames.length; i++) {
      const checkbox = document.querySelector(`input[name="${foodName}-${i}"]`);
      if (checkbox.checked) {
        checkedCounts[foodName]++;
      }
    }
  }

  for (let personName of peopleNames) {
    let totalBill = 0;
    for (let foodName in foodPrices) {
      const checkbox = document.querySelector(
        `input[name="${foodName}-${peopleNames.indexOf(personName)}"]`
      );
      if (checkbox.checked) {
        totalBill += foodPrices[foodName] / checkedCounts[foodName];
      }
    }
    document.getElementById(
      `${personName.toLowerCase()}Bill`
    ).textContent = `₹${totalBill.toFixed(2)}`;
  }
}
