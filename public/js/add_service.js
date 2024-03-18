//code is based on the CS 340 starter code
let addPersonForm = document.getElementById('add-service-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrder = document.getElementById("order");
    let inputService = document.getElementById("service");
    let inputTeam = document.getElementById("team");
    let inputVehicle =  document.getElementById("mySelect");

    // Get the values from the form fields
    let orderValue = inputOrder.value;
    let serviceValue = inputService.value;
    let teamValue = inputTeam.value;
    let vehicleValue = inputVehicle.value;

    // Put our data we want to send in a javascript object
    let data = {
        workOrder: orderValue,
        serviceTime: serviceValue,
        serviceTeam: teamValue,
        vehiclesID: vehicleValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-service-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
           location.reload()


        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})