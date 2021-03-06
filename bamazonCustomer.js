var mysql = require ('mysql');
var inquirer = require('inquirer');
// allows for color in the console
var colors = require('colors');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'norwich12',
    database: 'bamazon',
});

// then create a call back function to confirm if connection was successful:
connection.connect(function(error){
    if(error){
        throw error;
    }
   console.log ("connected as id" + connection.threadId);  //threadid is a process id from mySQL, does not need to be defined here

    connection.query("SELECT * FROM products", function(error,response){
        if(error) throw error;
        for (var i=0; i<response.length; i++) {
        console.log("Available for sale - ".green + (colors.yellow( "Item ID: " + response[i].item_id + "," + " Product: " 
        + response[i].product_name + "," + " $" + response[i].price)));
        //console.log(response[0].item_id);
        }
        start(response);
    });
});

function start (results) { 

  
    inquirer.prompt([
        {
            // type is limited to "input" or other specific commands (input, confirm, list, rawlist, etc..).  Name field is freeform.
            type: "list",
            name: "selectItemID",
            message: "What is the Item ID of the product you would like to buy?",
            choices: function() {
                var choiceArrayItemId = [];
                for (var i = 0; i < results.length; i++) {
                  choiceArrayItemId.push(results[i].item_id.toString());
                }
                return choiceArrayItemId;
            }
        },
        {
            type: "input",
            name: "selectNumUnits",
            message: "How many would you like to buy?"
        }

    ])
    
    .then (function(answer){
        CheckUnits(answer.selectItemID, answer.selectNumUnits);
        //let unitsPerchased = answer.selectNumUnits;
        //console.log(choiceArrayItemId);
    });     
};


// code to update number of units in db
function updateUnits(itemID, NumUnits, stock_quantity){
    //console.log(" Updating units".cyan);
    var query = connection.query(
        `UPDATE products SET stock_quantity = ${stock_quantity-NumUnits} WHERE ${itemID} = item_id`, function(err, results){
            if (err){
                throw err;
            }
            else{
	            //console.log(NumUnits);
	            console.log("Your order has been placed successfully!".bold);
	   
            }
            
        }
    )
}
function OrderTotal(NumUnits, price){
	
	console.log("Order Total $" + NumUnits * price);

}

function CheckUnits(ItemID, NumUnits, price){

  // query the database for the unit count of items being sold
  connection.query(`SELECT stock_quantity, price FROM products WHERE ${ItemID} = products.item_id`, function(err, results) {
    //   console.log(results);
    //   console.log(results[0].stock_quantity);
    //   console.log(NumUnits);
    	let price = results[0].price;
    	
    	//console.log(price);


    if (err){
        throw err;
    }
    
    else if (parseInt(NumUnits)> results[0].stock_quantity) {

        console.log ("Insufficient quantity - cannot complete your order.")
        //start();
        
      
    }
    

    else if (parseInt(NumUnits) <= results[0].stock_quantity) {

    // once you have the items, prompt the user for which they'd like to bid on
   
    updateUnits(ItemID, NumUnits, results[0].stock_quantity);
    
    OrderTotal(NumUnits, price);
    	    
    };
        
        connection.end();
    })
}





