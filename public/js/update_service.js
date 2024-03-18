//code is based on the CS 340 starter code



let updateServiceForm = document.getElementById('update-service-form-ajax');
// Modify the objects we need
updateServiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let serviceName = document.getElementById("inputSelect");
    let orderName = document.getElementById("input-order");
    let serviceTime = document.getElementById("input-service");
    let teamName = document.getElementById("input-team");
    let vehicleName = document.getElementById("vehicleSelect");


    // Get the values from the form fields
    let serviceValue = parseInt(serviceName.value);
    let orderValue = parseInt(orderName.value);
    let timeValue = parseInt(serviceTime.value);
    let teamValue = teamName.value;
    let vehicleValue = parseInt(vehicleName.value);


    // Put our data we want to send in a javascript object
    let data = {
        serviceID: serviceValue,
        workOrder:orderValue,
        serviceTime:timeValue,
        serviceTeam:teamValue,
        vehiclesID:vehicleValue
    }



    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-service-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
