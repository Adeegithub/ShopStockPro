
//Import the sqlite3 library
var sqlite = require('sqlite3').verbose();

//Define the database name
const DBSOURCE = "db.sqlite";


//Create a new sqlite database instance and export it
let db = new sqlite.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Succesfully Connected to the SQLite database.');
        db.run(`CREATE TABLE customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            address text,
            email text,
            dateOfBirth text,
            gender text,
            age text,
            cardHolderName text,
            cardNumber text,
            expiryDate text,
            cvv text,
            timeStamp text
            )`, (err) => {
            if (err) {
                console.log('Table already created');
            } else {
                var insert = 'INSERT INTO customer(name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                db.run(insert, ['Adeesha Arunoda Gunawardana', 'Galle', 'arunodagunawardana@gmail.com', '30/11.1997', 'Male', '26', 'Arunoda Gunawardana', '1234 5678 9123 45678', '12/24', '123', '2023-09-14 10:00:00'])
            }
        });
    }
});

module.exports = db;