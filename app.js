let jsonObject = JSON.parse(document.currentScript.getAttribute("jsonObject"));

$.makeTable = function(mydata) {
  let table = $('<table class="table" border=1>');
  let tHead = $("<thead>");
  let tBody = $("<tbody>");
  let tblHeader = "<tr id=tableHeader>";

  for (let k in mydata[0]) {
    kTag = k[0].toUpperCase() + k.slice(1);
    tblHeader += "<th id=" + k + ">" + kTag + "</th>";
  }

  tblHeader += "</tr>";
  $(tblHeader).appendTo(tHead);
  $(tHead).appendTo(table);

  $.each(mydata, function(index, value) {
    let TableRow = "<tr>";
    $.each(value, function(key, val) {
      TableRow += "<td>" + val + "</td>";
    });
    TableRow += "</tr>";
    $(TableRow).appendTo(tBody);
  });

  $(tBody).appendTo(table);

  return $(table);
};

let table = $.makeTable(jsonObject);
$(table).appendTo("#TableDiv");

$("#id, #name, #position, #salary, #start_date, #office, #extn").each(
  function() {
    $(this).click(function() {
      let table = $(this)
        .parents("table")
        .eq(0);
      let rows = table
        .find("tr:gt(0)")
        .toArray()
        .sort(comparer($(this).index()));
      this.asc = !this.asc;
      if (!this.asc) {
        rows = rows.reverse();
      }
      for (let i = 0; i < rows.length; i++) {
        table.append(rows[i]);
      }
    });
  }
);

function comparer(index) {
  return function(a, b) {
    let valA = getCellValue(a, index);
    let valB = getCellValue(b, index);

    if (valA[0] === "$" && valB[0] === "$") {
      // using regular expression to replace all instances of ','
      valA = valA.replace(/,/g, "").slice(1);
      valB = valB.replace(/,/g, "").slice(1);
    }

    return $.isNumeric(valA) && $.isNumeric(valB)
      ? valA - valB
      : valA.toString().localeCompare(valB);
  };
}

function getCellValue(row, index) {
  return $(row)
    .children("td")
    .eq(index)
    .text();
}

function searchTable() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toUpperCase();
  let table = document.getElementById("TableDiv");
  let tr = table.getElementsByTagName("tr");
  let counter = 0;
  for (let i = 0; i < tr.length; i++) {
    let found;
    let td = tr[i].getElementsByTagName("td");
    for (let j = 0; j < td.length; j++) {
      if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tr[i].style.display = "";
      found = false;
    } else if (tr[i].id != "tableHeader") {
      tr[i].style.display = "none";
    }

    if (tr[i].style.display == "none") {
      counter += 1;
    }
  }

  if (counter == tr.length - 1) {
    $("#noRecords").show();
  } else {
    $("#noRecords").hide();
  }
}
