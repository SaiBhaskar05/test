const express = require('express');
const connectDB = require('./db.js');
const Item = require('./models/item.js'); // Item model
const mongoose=require('mongoose');

const startServer = async () => {
    try {
        const app = express();
        const cors = require('cors');
        app.use(cors(
            {
                origin:["https://test-two-lac-40.vercel.app"],
                methods:["POST","GET"],
                credentials: true
            }
        ));
        app.use(express.json());
        
        // Connect to MongoDB
        connectDB();
        
        // GET: Retrieve all items (users)
        app.get('/', async (req, res) => {
            res.json("Hello");
            try {
                const items = await Item.find();
                res.json({ items });
                
            } catch (error) {
                res.status(500).json({ message: 'Failed to fetch items' });
            }
        });

        // POST: Add a new user (sign up)
        app.post('/signup', async (req, res) => {
            const { UserName, email, password } = req.body;
            try {
                // Check for duplicate email
                const existingUser = await Item.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email already exists' });
                }

                const newItem = new Item({ UserName, email, password });
                await newItem.save();
                res.status(201).json({ message: 'User registered successfully!' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error registering user' });
            }
        });

        // POST: Authenticate user (login)
        app.post('/login', async (req, res) => {
            const { emailOrUserName, password } = req.body;
            try {
                // Find user by either email or username
                const user = await Item.findOne({
                    $or: [{ email: emailOrUserName }, { UserName: emailOrUserName }]
                });

                if (!user) {
                    return res.status(400).json({ message: 'No user found with that username/email' });
                }

                // Validate password
                if (user.password !== password) {
                    return res.status(400).json({ message: 'Invalid password' });
                }

                res.status(200).json({
                  message: 'Login successful',
                  userName: user.UserName,  // Include the userName in the response
                  userId: user._id,
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error logging in' });
            }
        });

        

        // Start the server
        app.listen(3000, () => {
            console.log('Server started on http://localhost:3000');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
