let jsonObject = JSON.parse(document.currentScript.getAttribute("jsonObject"));

$.makeTable = function(mydata) {
  let table = $("<table id=tableMain border=1>");
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

$(document).ready(function() {
  $("#tableMain").DataTable({
    order: [[0, "asc"]],
    lengthMenu: [[-1, 10, 25, 50], ["All", 10, 25, 50]]
  });
});
