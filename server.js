// Import express module to create web server
const express = require('express');

// Initialize the express instance
var app = express();

// Import the database
var db = require('./database.js');

// Importing body parser to parse JSON data
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Define the port to run the server on
let HTTP_PORT = 8000;

// Import a library for email validation
var validator = require('validator')

// Start the server
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

app.post('/api/customer/', (request, response, next) => {
    try {
        var errors = [];
        if (!request.body) {
            errors.push('No body specified');
        }

        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        } = request.body;

        console.log('Email to validate:', email);
        console.log('Email validation result:', validator.isEmail(email));

        // Validate email address
        if (!validator.isEmail(email)) {
            errors.push('Invalid email address');
            throw new Error('Invalid email address');
        }

        if(cardNumber.length != 12){
            console.log("Card Length: " , cardNumber.length)
            errors.push('Invalid card number');
            throw new Error('Invalid card number');
        }
        
        var sql = 'INSERT INTO customer (name,address,email,dateOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp];

        db.run(sql, params, function (err, result) {
            if (err) {
                response.status(400).json({
                    "error": err.message
                });
                return;
            } else {
                response.status(201).json({
                    "message": `Customer ${name} has registered`,
                    //"data": data,
                    "customerId": this.lastID
                })
            }
        });
    }
    catch (error) {
        response.status(400).json({ "error": error.message });
    }
});