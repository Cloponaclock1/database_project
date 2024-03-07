// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let id = document.getElementById("mySelect");
    let first = document.getElementById("first");
    let middle = document.getElementById("middle");
    let last = document.getElementById("last");
    let age = document.getElementById("input-age");
    let email = document.getElementById("input-email");
    let phone = document.getElementById("input-phone");
    let address = document.getElementById("input-address");

    console.log(first);




    // Get the values from the form fields
    let idvalue = parseInt(id.value);
    let firstvalue = first.value;
    let middlevalue = middle.value;
    let lastvalue = last.value;
    let agevalue = parseInt(age.value);
    let emailvalue = email.value;
    let phonevalue = phone.value;
    let addressvalue = address.value;



    // Put our data we want to send in a javascript object
    let data = {
        id: idvalue,
        firstName: firstvalue,
        middleName:middlevalue,
        lastName:lastvalue,
        age:agevalue,
        email:emailvalue,
        phone:phonevalue,
        address:addressvalue
    }
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
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