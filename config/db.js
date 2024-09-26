// Load Dependency 
const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect(process.env.MongoDBURL)
.then(() => {
    // console.log("MongoDB Connected");

    const db = mongoose.connection;
    console.log(`MongoDB Connected to Database: ${db.name} at Host: ${db.host} on PORT: ${db.port}`);
})
.catch((err) => {
    console.log("MangoDB not connected :<" + err);
});