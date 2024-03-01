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
    let query1 = "SELECT * FROM Services;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('services', {data: rows});
    })
});

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



app.delete('/delete-employee-ajax/', function(req,res,next){
    let data = req.body;
    console.log()
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
    })});

//VEHICLES






















































/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});