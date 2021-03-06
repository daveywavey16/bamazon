Node.js & MySQL


Overview

In this node.js file, you'll be using CRUD mysql commands to update product quantities creating an Amazon-like storefront with the MySQL skills. The app will take in orders from customers and deplete stock from the store's inventory. 

How it works
Using terminal the app will prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, the application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.
