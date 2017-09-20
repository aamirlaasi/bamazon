// require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password (no password used for this db)
  // password: "rootpassword",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  // Display all of the items available for sale
  var query = connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    var productArray = [];
    for (var i =0; i < results.length; i++) {
      productArray.push([results[i].item_id,results[i].product_name, results[i].price]);
    };
    console.log(productArray); 
    // Ask the user which item they would like to buy and how much
    inquirer
      .prompt([
        {
          name: "choice",
          type: "input",
          message: "What is the ID of the product you would like to buy?",
          validate: function(input){
            if (parseInt(input)===parseFloat(input)){
              return true;
            } else {
              return 'Please enter an integer for Product ID'
            }
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many units of the product would you like to buy?",
          validate: function(input){
            if (parseInt(input) === parseFloat(input)) {
              return true;
            } else {
              return 'Please enter a whole number for quantity'
            }
          }
        }
        ])
        .then(function(answer){
          // get the information of the chosen item
          var chosenItem;
          for (var i=0; i<results.length; i++) {
            if (results[i].item_id === parseInt(answer.choice)) {
              chosenItem = results[i];
            };
          };
          //check if product id is in the db
          if (chosenItem == null) {
            console.log('Please select an item that is in the database')
            start();
          } 

          // Determine if enough quantity is available in stock
          else if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
            // Enough stock available, so update db, let the customer know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: chosenItem.stock_quantity - parseInt(answer.quantity)
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) throw error;
                // calculate the total cost
                var totalCost = chosenItem.price * answer.quantity;
                console.log("Your total cost is $" + totalCost);
                start();
              }
            );
          }


          else {
            // Insufficient quantity
            console.log("Insufficient Quantity!");
            start();
          }
        }); 
  });
}





