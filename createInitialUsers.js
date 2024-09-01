require('dotenv').config(); // This line should load the environment variables from your .env file

const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const CUSTOMER_PASSWORD = process.env.CUSTOMER_PASSWORD;

async function createInitialUsers() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Create an admin user
        const hashedAdminPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        const admin = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedAdminPassword,
            role: 'client' // Admin role
        });
        await admin.save();
        console.log('Admin user created');

        // Create some initial customers
        const hashedCustomerPassword = await bcrypt.hash(CUSTOMER_PASSWORD, 10);
        const customer1 = new User({
            name: 'Customer One',
            email: 'customer1@example.com',
            password: hashedCustomerPassword,
            role: 'customer'
        });
        const customer2 = new User({
            name: 'Customer Two',
            email: 'customer2@example.com',
            password: hashedCustomerPassword,
            role: 'customer'
        });
        await customer1.save();
        await customer2.save();
        console.log('Initial customers created');

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
}

createInitialUsers();
