const db = require('./db/connection');
const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');

// PORT designation
const PORT = process.env.PORT || 3001;
// app expression
const app = express();

// express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT roles.*, departments.department_name
                 AS department_name
                 FROM roles
                 LEFT JOIN departments
                 ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a single department
app.get('/api/department/:id', (req, res) => {
    const sql = `SELECT roles.*, departments.department_name
                 AS department_name
                 FROM roles
                 LEFT JOIN departments
                 ON roles.department_id = departments.id
                 WHERE roles.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
})

// Create a department
app.post('/api/department', ({ body }, res) => {
    const errors = inputCheck(
        body,
        'department_name'
    );
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO departments (department_name)
        VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Delete a department
app.delete('/api/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Get all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    })
});

// Get specific roles
app.get('/api/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Create a role


// Delete a specific role
app.delete('/api/role/:id', (req, res) => {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // checks if anything was deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Get all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    })
});

// Get specific employee
app.get('/api/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employees WHERE id =?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Create an employee


// Delete an employee
app.delete('/api/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
            // check if anything is deleted
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// default error message (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});