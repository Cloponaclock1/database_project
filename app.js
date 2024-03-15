/*
    SETUP
*/

// Express
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


PORT = 3211;

// Database
var db = require('./database/db-connector');

// Handlebars
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
}));
app.set('view engine', '.hbs');
app.use(express.static("public"));

function get_id() {
    let query1 = "SELECT * FROM Vehicles";
    db.pool.query(query1, function(error, rows, fields){
        console.log({data:rows});
        return {data:rows};
    })
}



/*
    ROUTES
*/

// gets
app.get('/index.hbs', function(req, res)
{
    res.render('index.hbs');
});

app.get('/', function(req, res)
{
    res.render('index');
});

app.get('/services.hbs', function(req, res)
{
    let query1 = "SELECT * FROM Services";
    let query2 = "SELECT vehiclesID FROM Vehicles"



    db.pool.query(query1, function(error, result, fields) {
        if (error) 
         {
            console.log(error);
        } else
        {
            let data = result;
            db.pool.query(query2, (error, result, fields) => {
                if (error) 
                {
                    console.log(error);
                } else 
                {
                    let vehiclesID = result;
                    res.render('services', {data: data, vehiclesID: vehiclesID});
                }
            })}})});


app.get('/customers.hbs', function(req, res)
{
    let query1 = "SELECT * FROM Customers;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('customers', {data: rows});
    })
    
});
app.get('/employees.hbs', function(req, res)
{
    let query1 = "SELECT * FROM Employees;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('employees', {data: rows});
    })
});

app.get('/sales.hbs', function(req, res)
{
    let query1 = "SELECT * FROM Sales;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('sales', {data: rows});
    })

});

app.get('/vehicles.hbs', function(req, res)
{
    let query1 = "SELECT * FROM Vehicles;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('vehicles', {data: rows});
    })
});
//posts

//EMPLOYEE
app.post('/add-employee-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Capture NULL values
    let employee = data['employeesName'];
    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (employeesName) VALUES ('${employee}')`; 

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Employees;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});
//vehicle
app.post('/add-vehicle-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Capture NULL values
    let make = data['make'];
    let model = data['model'];
    let year = data["year"];



    // Create the query and run it on the database
    query1 = `INSERT INTO Vehicles (make, model, year) VALUES ('${make}', '${model}', '${year}')`; 

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM Vehicles;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});



app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let first = data['first'];
    let middle= data['middle'];
    let last = data['last'];
    let age = parseInt(data['age']);
    let email = data['email'];
    let phone = data["phone"];
    let address = data["address"];






    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (firstName, middleName, lastName, age, email, phone, address) VALUES ('${first}', '${middle}', '${last}', '${age}', '${email}', '${phone}','${address}')`; 

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-service-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Capture NULL values
    let workOrder = data['workOrder'];
    let serviceTime = parseInt(data['serviceTime']);
    let serviceTeam = data['serviceTeam'];
    let vehiclesID = parseInt(data['vehiclesID']);



    // Create the query and run it on the database
    query1 = `INSERT INTO Services (workOrder, serviceTime, serviceTeam, vehiclesID) VALUES ('${workOrder}', '${serviceTime}', '${serviceTeam}', '${vehiclesID}')`; 

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT *
            query2 = `SELECT * FROM Services;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});




app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    let employeesID = parseInt(data.id);

    let deleteEmployee = `DELETE FROM Employees WHERE employeesID = ?`;
    let deleteEmployee_Sales =`DELETE FROM Sales WHERE employeesID = ?`;
  
          // Run the 1st query
          db.pool.query(deleteEmployee, [employeesID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteEmployee_Sales, [employeesID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});


app.delete('/delete-vehicle-ajax', function(req,res,next){
    let data = req.body;
    let vehiclesID = data.id;
    let deletevehicles = `DELETE FROM Vehicles WHERE vehiclesID = ?`;
    let deletesales= `DELETE FROM Sales WHERE vehiclesID = ?`;


        // Run the 1st query
        db.pool.query(deletevehicles, [vehiclesID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deletesales, [vehiclesID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
})});

app.delete('/delete-customer-ajax', function(req,res,next){
    let data = req.body;
    let customersID = parseInt(data["id"]);
    let deleteCustomers= `DELETE FROM Customers WHERE customersID = ?`;
    let deleteSales= `DELETE FROM Sales WHERE customersID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteCustomers, [customersID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteSales, [customersID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});




  app.delete('/delete-service-ajax/', function(req,res,next){
    let data = req.body;
    let servicesID = parseInt(data.id);
    let deleteService = `DELETE FROM Services WHERE servicesID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteService, [servicesID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);

              }
  })});






app.put('/put-vehicle-ajax', function(req,res,next){
    let data = req.body;
    let make = data["make"];
    let model = data["model"];
    let year = parseInt(data["year"]);
    let id = data["vehiclesID"];



    let queryUpdateVehiclemake = `UPDATE Vehicles SET make= ?, model= ?, year = ? WHERE vehiclesID = ?`;
        // Run the 1st query
    db.pool.query(queryUpdateVehiclemake, [make,model, year,id], function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }else
        {
            res.send(rows);
            console.log(rows);

            
        }
})

});

app.put('/put-employee-ajax', function(req,res,next){
    let data = req.body;

    let person =data['name'];
    let id = data = parseInt(data.employeesID);



let queryUpdateEmployee = `UPDATE Employees SET employeesName= ? WHERE employeesID = ?`;

        // Run the 1st query
        db.pool.query(queryUpdateEmployee, [person, id], function(error, rows, fields){
            if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }else
            {
                res.send(rows);
            }
    })

});

app.put('/put-customer-ajax', function(req,res,next){
    let data = req.body;
  
    let customersID = data.id;
    let firstName = data.firstName;
    let middleName = data.middleName;
    let lastName = data.lastName;
    let age = data.age;
    let email = data.email;
    let phone = data.phone;
    let address = data.address;    

  
    let queryUpdateWorld = `UPDATE Customers SET firstName = ?, middleName= ?, lastName=?, age= ?, email= ?, phone= ?, address= ? WHERE customersID = ?`;
  
          // Run the 1st query
          db.pool.query(queryUpdateWorld, [firstName, middleName, lastName, age, email, phone, address, customersID], function(error, rows, fields){
            if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
            else
            {
                res.send(rows);

            }
              })});









































/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});