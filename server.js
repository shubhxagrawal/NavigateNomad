const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing

// Database connection details (replace with your actual credentials)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user_login_db',
  port:3306
});

const app = express();

// Serve static files from the current directory
app.use(express.static(path.join(__dirname, '.')));

// Configure body parser to handle form data
app.use(bodyParser.urlencoded({ extended: false }));

// Routes for registration and login

// Registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password using bcrypt before storing
  const saltRounds = 10; // Adjust salt rounds as needed (higher = more secure)
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  connection.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Registration failed!');  // Handle errors appropriately
    } else {
      res.send('Registration successful!');
    }
  });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Fetch user by email
  const sql = `SELECT * FROM users WHERE email = ?`;
  connection.query(sql, [email], async (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Login failed!');  // Handle errors appropriately
    } else if (user.length === 0) {
      res.send('Invalid email or password');  // User not found
    } else {
      // Compare hashed passwords using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user[0].password);

      if (isPasswordValid) {
        // Login successful (redirect or send success message)
        // res.send('Login successful!');
        res.redirect('/homeee.html');
      } else {
        res.send('Invalid email or password');  // Password mismatch
      }
    }
  });
});

app.listen(2000, () => console.log('Server listening on port 2000'));


