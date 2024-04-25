let pn = [];
let fp = [];

function ct() {
  const nop = document.getElementById("nop").value;
  const nof = document.getElementById("nof").value;
  const t = document.getElementById("tc");
  const fn = [];

  const table = document.createElement("table");

  const thead = document.createElement("thead");

  const hr = document.createElement("tr");
  const hfn = document.createElement("th");
  hfn.textContent = "Food Names";
  const hfp = document.createElement("th");
  hfp.textContent = "Food Prices";

  hr.appendChild(hfn);
  hr.appendChild(hfp);
  //table heading PERSON A,B,C.....
  for (let i = 0; i < nop; i++) {
    const hpn = document.createElement("th");

    const ip = document.createElement("input");
    ip.type = "text";
    ip.id = `p${i}`;
    ip.value = `PERSON ${String.fromCharCode(65 + i)}`;

    hpn.appendChild(ip);
    hr.appendChild(hpn);
  }

  thead.appendChild(hr);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  //adds foodname, food price textbox with checkboxes for nof times
  for (let i = 0; i < nof; i++) {
    const row = document.createElement("tr");
    const fnc = document.createElement("td");
    const fnip = document.createElement("input");
    fnip.type = "text";
    fnip.id = `fn${i}`;
    fnip.value = `F${i + 1}`;
    fnc.appendChild(fnip);

    const fpc = document.createElement("td");
    const fpip = document.createElement("input");
    fpip.type = "number";
    fpip.id = `fp${i}`;
    fpip.value = `0`;
    fpc.appendChild(fpip);
    row.appendChild(fnc);
    row.appendChild(fpc);

    //for ith food adds checkboxes nop times,,,.
    for (let j = 0; j < nop; j++) {
      const cell = document.createElement("td");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = `f${i}p${j}`;
      cell.appendChild(cb);
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  t.innerHTML = "";
  t.appendChild(table);
}

function uv() {
  let cc = {};
  const nop = parseInt(document.getElementById("nop").value);
  const nof = parseInt(document.getElementById("nof").value);
  //push peoplename in pn
  for (i = 0; i < nop; i++) {
    const ppln = document.getElementById(`p${i}`).value;
    pn.push(ppln);
  }

  //fp[foodname]=price ,, updates price.
  for (i = 0; i < nof; i++) {
    const foodn = document.getElementById(`fn${i}`).value;
    const foodp = parseInt(document.getElementById(`fp${i}`).value);
    fp[foodn] = foodp;
  }

  //billdetails
  //bdt=billdetailstable
  //thead
  const bdt = document.createElement("table");
  bdt.id = "bdetails";
  bdt.border = 1;

  const thead = document.createElement("thead");

  const hr = document.createElement("tr");
  const headname = document.createElement("th");
  headname.textContent = "Names";
  const htb = document.createElement("th");
  htb.textContent = "Total Bill";

  hr.appendChild(headname);
  hr.appendChild(htb);
  thead.appendChild(hr);
  bdt.appendChild(thead);

  //create table body,, adds names and bill amount,
  const tbody = document.createElement("tbody");

  for (i = 0; i < nop; i++) {
    const pplnam = document.getElementById(`p${i}`).value;

    const trr = document.createElement("tr"); //trr=table row

    const cellname = document.createElement("td");
    cellname.textContent = pplnam;

    const cellbill = document.createElement("td");
    cellbill.id = `pnb${i}`;
    cellbill.textContent = "₹0.00";
    trr.appendChild(cellname);
    trr.appendChild(cellbill);
    tbody.appendChild(trr);
    bdt.appendChild(tbody);
  }

  const bill = document.getElementById("bd");
  bill.innerHTML = ""; //clears the old bill table if any.
  bill.appendChild(bdt);
  bill.style.display = "block";

  //cc=0, total checks of that food is set to 0
  for (i = 0; i < nof; i++) {
    cc[i] = 0;
  }

  //cc++ for each food , updates the umber of checks for that food item
  for (let i = 0; i < nof; i++) {
    for (let j = 0; j < nop; j++) {
      const ccb = document.getElementById(`f${i}p${j}`);
      if (ccb.checked) {
        cc[i]++;
      }
    }
  }

  //calcation
  for (let i = 0; i < nop; i++) {
    let tb = 0;
    for (let j = 0; j < nof; j++) {
      const foodp = parseFloat(document.getElementById(`fp${j}`).value);
      const ccb = document.getElementById(`f${j}p${i}`);
      if (ccb.checked && cc[j] !== 0) {
        tb += foodp / cc[j];
      }
      document.getElementById(`pnb${i}`).textContent = `₹${tb.toFixed(2)}`;
    }
  }
}

function addFoodItem() {
  const nof = parseInt(document.getElementById("nof").value);
  document.getElementById("nof").value = nof + 1;
  ct();
}

function addPerson() {
  const nop = parseInt(document.getElementById("nop").value);
  document.getElementById("nop").value = nop + 1;
  ct();
}
function printPDF() {
  window.print();
}
