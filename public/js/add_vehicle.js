// Get the objects we need to modify
window.onload=function(){
    let addVehicleForm = document.getElementById('add-vehicle-form-ajax');

    // Modify the objects we need
    addVehicleForm.addEventListener("submit", function (e) {
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let inputmake = document.getElementById("make");
        let inputmodel = document.getElementById("model");
        let inputyear = document.getElementById("year");

        // Get the values from the form fields
        let makeValue = inputmake.value;
        let modelValue = inputmodel.value;
        let yearValue = parseInt(inputyear.value);

        // Put our data we want to send in a javascript object
        let data = {
            make: makeValue,
            model: modelValue,
            year: yearValue,
        }

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", '/add-vehicle-ajax', true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                location.reload();
                // Clear the input fields for another transaction
                inputmake.value = '';
                inputmodel.value = '';
                inputyear.value = '';
            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
        

    })
}

// Creates a single row from an Object representing a single record from 

addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("vehicle-table");
    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let makeCell = document.createElement("TD");
    let modelCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.vehiclesID;
    makeCell.innerText = newRow.make;
    modelCell.innerText = newRow.model;
    yearCell.innerText = newRow.year;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteVehicle(newRow.vehiclesID);
    };




    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(makeCell);
    row.appendChild(modelCell);
    row.appendChild(yearCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.vehiclesID);




    // Add the row to the table
    currentTable.appendChild(row);


    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.value = newRow.employeesID;
    selectMenu.add(option);
    // End of new step 8 code.

}