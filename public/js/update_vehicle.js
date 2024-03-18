//code is based on the CS 340 starter code



let updateVehicleForm = document.getElementById('update-vehicle-form-ajax');

// Modify the objects we need
updateVehicleForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputid = document.getElementById("mySelect");
    let inputmake = document.getElementById("input-make");
    let inputmodel = document.getElementById("input-model");
    let inputyear = document.getElementById("input-year");


    // Get the values from the form fields
    let idValue = parseInt(inputid.value);
    let makeValue = inputmake.value;
    let modelValue = inputmodel.value;
    let yearValue = parseInt(inputyear.value);



    // Put our data we want to send in a javascript object
    let data = {
        vehiclesID: idValue,
        make: makeValue,
        model: modelValue,
        year: yearValue
    }
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-vehicle-ajax", true);
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


function updateRow(data, info){
    location.reload()
    
}