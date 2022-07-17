const mysql = require('mysql2');
const express = require('express');

// PORT designation
const PORT = process.env.PORT || 3001;
// app expression
const app = express();

// express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tracker'
    },
    console.log('Connected to the tracker database')
);

// build database calls
db.query(`SELECT * FROM department`, (err, rows) => {
    console.log(rows);
});

// Delete a department
db.query(`DELETE FROM department WHERE id = ?`, 1, (err, result) {
if (err) {
    console.log(err);
}
console.log(result);
})

// general error message
app.use((req, res) => {
    res.status(404).end();
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});