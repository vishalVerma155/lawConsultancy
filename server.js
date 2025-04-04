const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : "*"}));


// DB connection
const dbconnect = require('./config/db.js');



const appointementRouter = require("./routes/appointement.routes.js")
const adminRouter = require('./routes/admin.routes.js')

app.use("/appointement", appointementRouter);
app.use("/admin", adminRouter);



// Start the server
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
    dbconnect();
});

// Default route
app.get('/', (req, res) => {
    res.send("Default Route");
});