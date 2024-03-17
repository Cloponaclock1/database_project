let addPersonForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputfirst = document.getElementById("f_name");
    let inputmiddle = document.getElementById("m_name");
    let inputlast = document.getElementById("l_name");
    let inputage = document.getElementById("age");
    let inputemail = document.getElementById("email");
    let inputphone = document.getElementById("phone");
    let inputaddress = document.getElementById("address");


    // Get the values from the form fields
    let firstValue = inputfirst.value;
    let middleValue = inputmiddle.value;
    let lastValue = inputlast.value;
    let ageValue = parseInt(inputage.value);
    let emailValue = inputemail.value;
    let phoneValue = inputphone.value;
    let addressValue = inputaddress.value;


    // Put our data we want to send in a javascript object
    let data = {
        first: firstValue,
        middle: middleValue,
        last: lastValue,
        age: ageValue,
        email:emailValue,
        phone:phoneValue,
        address:addressValue
    }
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Reload the page with new data applied
            location.reload();


           
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

