function ct(){
  const nos = document.getElementById("nos").value;
  const t = document.getElementById("tc");

  const table = document.createElement("table");

  const thead = document.createElement("thead");

  const hr = document.createElement("tr");

  const sn = document.createElement("th");
    sn.textContent = "SUBJECT";
  const cie = document.createElement("th");
    cie.textContent = "CIE (OUT OF 50)";
  const see = document.createElement("th");
    see.textContent = "SEE (OUT OF 50)";
  const tt = document.createElement("th");
    tt.textContent = "TOTAL(CIE+SEE)";
  const g = document.createElement("th");
    g.textContent = "GRADE";
  const gp = document.createElement("th");
    gp.textContent = "GRADE POINT";
  const c = document.createElement("th");
    c.textContent = "CREDITS";
  const ttt = document.createElement("th");
    ttt.textContent = "TOTAL(GP*C)";

  hr.appendChild(sn);
  hr.appendChild(cie);
  hr.appendChild(see);
  hr.appendChild(tt);
  hr.appendChild(g);
  hr.appendChild(gp);
  hr.appendChild(c);
  hr.appendChild(ttt);

  thead.appendChild(hr);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  for (let i = 0; i < nos; i++) 
  {
    const row = document.createElement("tr");
    
    const sbn = document.createElement("td");
      const sip = document.createElement("input");
        sip.type = "text";
        sip.id = `sn${i}`;
        sip.value = `SUBJECT ${i + 1}`;
      sbn.appendChild(sip);

    const ciec = document.createElement("td");
      const cieip = document.createElement("input");
        cieip.type = "number";
        cieip.id = `cie${i}`;
        cieip.value = `50`;
        cieip.min = `0`;
        cieip.max = `50`;
        cieip.step=`1`;
      ciec.appendChild(cieip);
    
    const seec = document.createElement("td");
      const seeip = document.createElement("input");
        seeip.type = "number";
        seeip.id = `see${i}`;
        seeip.value = `50`;
        seeip.min = `0`;
        seeip.max = `50`;
        seeip.step=`1`;
      seec.appendChild(seeip);

    const ttc = document.createElement("td");
      ttc.id = `tt${i}`;
    const gc = document.createElement("td");
      gc.id = `g${i}`;
    const gpc = document.createElement("td");
      gpc.id = `gp${i}`;

    const crec = document.createElement("td");
      const creip = document.createElement("input");
        creip.type = "number";
        creip.id = `cre${i}`;
        creip.value = `3`;
        creip.min = `0`;
        creip.max = `4`;
        creip.step=`1`;
      crec.appendChild(creip);
    const tttc = document.createElement("td");
      tttc.id = `ttt${i}`;

    row.appendChild(sbn);
    row.appendChild(ciec);
    row.appendChild(seec);
    row.appendChild(ttc);
    row.appendChild(gc);
    row.appendChild(gpc);
    row.appendChild(crec);
    row.appendChild(tttc);

    tbody.appendChild(row);
  
  table.appendChild(tbody);
  t.innerHTML = "";
  t.appendChild(table);
}
}

function uv() {
  const nos = parseInt(document.getElementById("nos").value);
  let s = 0, cret = 0;
  const ssgpa = document.getElementById("s_gpa");
  ssgpa.innerHTML = "";

  for (let i = 0; i < nos; i++) {
    const cie = parseFloat(document.getElementById(`cie${i}`).value);
    const se = parseFloat(document.getElementById(`see${i}`).value);
    const tt = document.getElementById(`tt${i}`);
    const g = document.getElementById(`g${i}`);
    const gp = document.getElementById(`gp${i}`);
    const ttt = document.getElementById(`ttt${i}`);
    const c = parseFloat(document.getElementById(`cre${i}`).value);

    // Clearing previous data:
    tt.innerHTML = "";
    g.innerHTML = "";
    gp.innerHTML = "";
    ttt.innerHTML = "";

    let tot = cie + se;


    tt.textContent = `${tot.toFixed(2)}`; // Total updates

    // Grade and Grade point updates (also value is assigned grpt)
    let grade, gradePoint;
    if (tot >= 90 && tot <= 100) {
      grade = "O (Outstanding)";
      gradePoint = 10;
    } else if (tot >= 80 && tot <= 89) {
      grade = "A+ (Excellent)";
      gradePoint = 9;
      grpt = 1;
    } else if (tot >= 70 && tot <= 79) {
      grade = "A (Very good)";
      gradePoint = 8;
    } else if (tot >= 60 && tot <= 69) {
      grade = "B+ (Good)";
      gradePoint = 7;
    } else if (tot >= 50 && tot <= 59) {
      grade = "B (Average)";
      gradePoint = 6;
    } else if (tot >= 40 && tot <= 49) {
      grade = "C (Pass)";
      gradePoint = 5;
    } else {
      grade = "F (Fail)";
      gradePoint = 0;
    }

    g.textContent = grade;
    gp.textContent = gradePoint;
    const tttv = c * gradePoint;
    s = s + tttv;
    cret = cret + c;
    ttt.textContent = `${tttv}`; // Final total of each subject gets updated
  }

  const sgpa = s / cret;

  const sg = document.createElement("table");
  sg.style.display = "block";
  const r = document.createElement("tr");
  const c1 = document.createElement("th");
  c1.textContent = "SGPA  =  ";
  const c2 = document.createElement("th");
  c2.textContent = `${sgpa.toFixed(2)}`;
  r.appendChild(c1);
  r.appendChild(c2);
  sg.appendChild(r);

  ssgpa.appendChild(sg);
}

function addSubject() 
{
  const nos = parseInt(document.getElementById("nos").value);
  document.getElementById("nos").value = nos + 1;
  ct();
}
function printPDF() 
{
  window.print();
}
