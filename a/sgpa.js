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

function uv() 
{
  const s=0,cret=0,sgpa;
  const ssgpa=document.getElementById("s_gpa");
  ssgpa.innerHTML="";

  for (i = 0; i < nop; i++) 
  {
    const cie=document.getElementById(`cie${i}`).value;
    const se=document.getElementById(`see${i}`).value;
    const tt=document.getElementById(`tt${i}`);
    const g=document.getElementById(`g${i}`);
    const gp=document.getElementById(`gp${i}`);
    const ttt=document.getElementById(`ttt${i}`);
    const c=document.getElementById(`cre${i}`).value;

    const tot,grpt,tttv;
    tot=cie*see;//subject total
    tttv=c*grpt;
    s=s+tttv;
    cret=cret+c;

    
    

  }
  sgpa=s/cret;
  
  const sg=document.createElement("table");
    sg.style.display = "block";
  const r=document.createElement("tr");

  const c1=document.createElement("th");
    c1.textContent="SGPA  =  ";
  const c2=document.createElement("th");
    c2.textContent=`${sgpa.ToFixed(2)}`;
  
r.appendChild(c1);
r.appendChild(c2);
sg.appendChild(r);

  ssgpa.appendChild(sg);
  

}

function addSubject() {
  const nof = parseInt(document.getElementById("nof").value);
  document.getElementById("nof").value = nof + 1;
  ct();
}


function printPDF() {
  window.print();
}
