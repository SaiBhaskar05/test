const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://SaiBhaskar05:Nanduri%402005@cluster0.k3llk.mongodb.net/myDatabase?retryWrites=true&w=majority',
            {
                dbName: 'myDatabase', // Optional: Replace with your actual database name
            }
        );

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
