

// Name: Connor McGrory
// Email: Connor_McGrroy@student.uml.edu
// Date: November 23, 2016
// For: GUI Programming I, UMass Lowell
// Assignement No. 8
// This webpage allows the user to create a dynamic multiplication table using sliders and tabs.

var n1;
var n2;
var n3;
var n4;

$("document").ready(function() {
  $("#multTable").validate({
      rules: {
          row_start: {
              required: true,
              digits: true,
              range: [0, 20]
          },
          row_end: {
              required: true,
              digits: true,
              range: [0, 20]
          },
          column_start: {
              required: true,
              digits: true,
              range: [0, 20]
          },
          column_end: {
              required: true,
              digits: true,
              range: [0, 20]
          }
      }
  });
});

$("#slider1").on("change", function(){ document.getElementById("row_start").value = this.value; });
$("#slider2").on("change", function(){ document.getElementById("row_end").value = this.value; });
$("#slider3").on("change", function(){ document.getElementById("column_start").value = this.value; });
$("#slider4").on("change", function(){ document.getElementById("column_end").value = this.value; });

$("#row_start").on("change", function(){ if($("#multTable").valid()) document.getElementById("slider1").value = this.value; });
$("#row_end").on("change", function(){ if($("#multTable").valid()) document.getElementById("slider2").value = this.value; });
$("#column_start").on("change", function(){ if($("#multTable").valid()) document.getElementById("slider3").value = this.value; });
$("#column_end").on("change", function(){ if($("#multTable").valid()) document.getElementById("slider4").value = this.value; });

$("#myButton").on("click", function(e) {
  e.preventDefault();
  saveTable();
});

$("#massDelete").on("click", function() {
  $("#tabs").hide();
  var act = 0;
  var toBeDeleted = [];
  var boxes = $("#boxes input");
  while(act < $("#tabs ul li").length) {
      $("#tabs").tabs({active: act});
      if(boxes[act].checked) {
        deleteTab();
        boxes = $("#boxes input");
        act = -1;
      }
      act++;
  }
  if($("#tabs ul li").length > 0) $("#tabs").show();
});

function createTable() {


  row_start = n1;
  row_end = n2;
  column_start = n3;
  column_end = n4;

  // Now the table can be created.
  var table = document.createElement('table');

  // Now each table element will be created in this for loop.
  for (var i = row_start-1; i <= row_end; i++){
      // A basic table row element is created here.
      var tr = document.createElement('tr');

      // Now the elements inside each row will be created.
      for (var j = column_start-1; j <= column_end; j++) {
        // A single table element is created here.
        var td = document.createElement('td');

        // Here, the multiplication is carried through.
        var value = document.createTextNode(''+i*j);

        // If this is the first table entry, it should be an empty block.
        if(j == column_start-1 && i == row_start-1) {
          value = document.createTextNode('');
        }
        // If this is the first row, write in the multiplicands.
        else if(i == row_start-1) {
          value = document.createTextNode(''+j);
        }
        // If this is the first column, write in the multipliers.
        else if(j == column_start-1) {
          value = document.createTextNode(''+i);
        }
        // The value is applied to the table entry.
        td.appendChild(value);

        // The table entry is added to the row element.
        tr.appendChild(td);
      }
      // The row element is added to table.
      table.appendChild(tr);
  }
  // The completed table is written to the body of the document.
  $("#myTable" + tableNum).append(table);
  $("#myTable" + tableNum).append("<button id='deleteButton' type='button' onClick='deleteTab()'>Delete</button>");
}

function deleteTab() {
  var tab = $("#tabs").tabs('option', 'active');
  $("#box" + $(".ui-state-active").attr("id")).remove();
  $("#tabs").find(".ui-tabs-nav li:eq(" + tab + ")").remove();
  $("div#tabs").tabs("refresh");
  if($("#tabs ul li").length == 0) {
      deleteDivs();
      $("#tabs").hide();
      $("#massDelete").hide();
  }
}

var tableNum = 0;
function saveTable() {

  if(!$("#multTable").valid()) return;

  // Next, the four values for our table are pulled from the form as strings.
  var row_start_string = document.getElementsByName('row_start')[0].value;
  var row_end_string = document.getElementsByName('row_end')[0].value;
  var column_start_string = document.getElementsByName('column_start')[0].value;
  var column_end_string = document.getElementsByName('column_end')[0].value;

  // Now the values are parsed as integers.
  var row_start = parseInt(row_start_string);
  var row_end = parseInt(row_end_string);
  var column_start = parseInt(column_start_string);
  var column_end = parseInt(column_end_string);

  // This check ensures that the user has entered a valid range.
  // If the range values are incorrect, swap them.
  if(row_end < row_start) {
    var temp = row_end;
    row_end = row_start;
    row_start = temp;
  }
  if(column_end < column_start) {
    var temp = column_end;
    column_end = column_start;
    column_start = temp;
  }

  n1 = row_start;
  n2 = row_end;
  n3 = column_start;
  n4 = column_end;

  tableNum++;

  $("#tabs").show();
  $("#tabs ul").append("<li id='TabVal" + tableNum + "'><a href='#tab" + tableNum + "'>Table " + tableNum + ": (" + n1 + ", " + n2 + ") by (" + n3 + ", " + n4 + ")</a></li>");
  $("#tabs").append("<div id='tab" + tableNum + "'><div id='myTable" + tableNum + "'></div></div>");
  $("#boxes").append("<div id='boxTabVal" + tableNum + "'><label><input type='checkbox'>Table " + tableNum + "</label><br></div>")
  $("#massDelete").show();
  $("#tabs").tabs("refresh");
  $("#tabs").tabs({active: $("#tabs ul li").length-1});
  createTable();
}

function writeError(msg) {
  // Here a basic one cell table is created to display an error message.
  // It is made into a table because the function deleteTables() will
  // remove our error message on the next run.
  var table = document.createElement('table');
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  var value = document.createTextNode(msg);
  td.appendChild(value);
  tr.appendChild(td);
  table.appendChild(tr);
  document.body.appendChild(table);
}

function deleteDivs() {
  for(var i = 1; i <= tableNum; i++) {
    $("#tab" + i).remove();
  }
  tableNum = 0;
}
