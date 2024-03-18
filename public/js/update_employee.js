//code is based on the CS 340 starter code




let updatePersonForm = document.getElementById('update-employee-form-ajax');
// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("mySelect");
    let newName = document.getElementById("input-fullname");






    // Get the values from the form fields
    let newNameValue = newName.value;
    let inputname = inputName.value;



    // Put our data we want to send in a javascript object
    let data = {
        name: newNameValue,
        employeesID:inputname,
    }



    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee-ajax", true);
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
