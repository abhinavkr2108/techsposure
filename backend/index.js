const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const upload = require('express-fileupload');
require('dotenv').config();

//Importing Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middlewares/ErrorMiddleware');

//Configuring Middlewares
const app = express();
app.use(cors({origin: '*'}, {credentials: true}));


app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(upload());
app.use("/uploads", express.static(`${__dirname}/uploads`));

//Routes
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

// Custom Middlewares
app.use(notFound)
app.use(errorHandler)

// Connect to Database
mongoose.connect(`${process.env.MONGODB_URL}/techsposure`).then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log('Connected to Database and Port is ', process.env.PORT);
    })
}).catch(err=>{
    console.error(err)
})



