const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');



// PORT designation
const PORT = process.env.PORT || 3001;
// app expression
const app = express();

// express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// use API routes
app.use('/api', apiRoutes); 


// default error message (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});