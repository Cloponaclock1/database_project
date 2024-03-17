// Get the objects we need to modify
window.onload=function(){
    let addPersonForm = document.getElementById('add-employee-form-ajax');
    // Modify the objects we need

    addPersonForm.addEventListener("submit", function (e) {
        
        // Prevent the form from submitting
        e.preventDefault();

        // Get form fields we need to get data from
        let inputName = document.getElementById("input-fname");
        

        // Get the values from the form fields
        let NameValue = inputName.value;


        // Put our data we want to send in a javascript object
        let data = {
            employeesName: NameValue,

        }
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/add-employee-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                location.reload();
                // Clear the input fields for another transaction
                inputName.value = '';

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    })

}
