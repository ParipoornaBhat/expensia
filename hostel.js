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
}

function updateAttendedDays(studentId) {
  const totalDays = parseInt(document.getElementById("totalDays").value);
  const reducedDays = parseInt(
    document.getElementById(`reducedDays_${studentId}`).value
  );
  const attendedDays = totalDays - reducedDays;
  document.getElementById(`attendedDays_${studentId}`).textContent =
    attendedDays;
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
}
