function generateTable() {
  const numStudents = document.getElementById("numStudents").value;
  const totalDays = document.getElementById("totalDays").value;
  const totalExpenditure = document.getElementById("totalExpenditure").value;
  const tableBody = document.querySelector("#studentsTable tbody");
  tableBody.innerHTML = ""; // Clear previous table

  for (let i = 1; i <= numStudents; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${i}</td>
                <td>${totalDays}</td>
                <td><input type="number" id="reducedDays_${i}" onchange="updateAttendedDays(${i})" value="0"></td>
                <td id="attendedDays_${i}">${totalDays}</td>
                <td id="bill_${i}">0</td>
            `;
    tableBody.appendChild(row);
  }

  document.getElementById("studentsTable").style.display = "table";
  saveMessData();
}

function updateAttendedDays(studentId) {
  const totalDays = parseInt(document.getElementById("totalDays").value);
  const reducedDays = parseInt(
    document.getElementById(`reducedDays_${studentId}`).value
  );
  const attendedDays = totalDays - reducedDays;
  document.getElementById(`attendedDays_${studentId}`).textContent =
    attendedDays;
  saveMessData();
}

function calculateBill() {
  const numStudents = document.getElementById("numStudents").value;
  const totalExpenditure = document.getElementById("totalExpenditure").value;
  const totalDays = document.getElementById("totalDays").value;
  const totalAttendedDays = Array.from({ length: numStudents }, (_, i) => {
    return parseInt(
      document.getElementById(`attendedDays_${i + 1}`).textContent
    );
  }).reduce((acc, val) => acc + val, 0);

  const individualBill = totalExpenditure / totalAttendedDays;

  for (let i = 1; i <= numStudents; i++) {
    const attendedDays = parseInt(
      document.getElementById(`attendedDays_${i}`).textContent
    );
    const bill = (individualBill * attendedDays).toFixed(2);
    document.getElementById(`bill_${i}`).textContent = bill;
  }
  saveMessData();
}
function printPDF() {
  window.print();
}

function saveMessData() {
  const data = {
    numStudents: document.getElementById("numStudents").value,
    totalDays: document.getElementById("totalDays").value,
    totalExpenditure: document.getElementById("totalExpenditure").value,
    students: []
  };
  const numStudents = parseInt(data.numStudents) || 0;
  for (let i = 1; i <= numStudents; i++) {
    const reducedDaysElem = document.getElementById(`reducedDays_${i}`);
    if (reducedDaysElem) {
      data.students.push({
        reducedDays: reducedDaysElem.value
      });
    }
  }
  localStorage.setItem("messData", JSON.stringify(data));
}

function loadMessData() {
  const saved = localStorage.getItem("messData");
  if (saved) {
    const data = JSON.parse(saved);
    if (data.numStudents) document.getElementById("numStudents").value = data.numStudents;
    if (data.totalDays) document.getElementById("totalDays").value = data.totalDays;
    if (data.totalExpenditure) document.getElementById("totalExpenditure").value = data.totalExpenditure;
    
    if (data.numStudents && parseInt(data.numStudents) > 0) {
      generateTable();
      for (let i = 1; i <= data.numStudents; i++) {
        const reducedDaysElem = document.getElementById(`reducedDays_${i}`);
        if (reducedDaysElem && data.students && data.students[i - 1]) {
          reducedDaysElem.value = data.students[i - 1].reducedDays;
          updateAttendedDays(i);
        }
      }
      if (document.getElementById(`bill_1`) && document.getElementById(`bill_1`).textContent !== "0" && data.totalExpenditure && parseFloat(data.totalExpenditure) > 0) {
        calculateBill();
      }
    }
  }
}

window.addEventListener("load", () => {
  loadMessData();
  document.getElementById("numStudents").addEventListener("input", saveMessData);
  document.getElementById("totalDays").addEventListener("input", saveMessData);
  document.getElementById("totalExpenditure").addEventListener("input", saveMessData);
});
