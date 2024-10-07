const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Database configuration
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to add attendance
app.post('/attendance', async (req, res) => {
    const { name, date } = req.body;
    try {
        await pool.query('INSERT INTO attendance(name, date) VALUES($1, $2)', [name, date]);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Endpoint to get attendance records
app.get('/attendance', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM attendance');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
