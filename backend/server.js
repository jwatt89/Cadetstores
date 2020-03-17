const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());


const uri = process.env.MONGO_URI
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true});

const connection = mongoose.connection;

connection.once('open',()=> {
    console.log("DB Connection Made");


});



const CadetsRouter = require('./routes/cadets');
const UniformRouter = require('./routes/uniform');
const DemandRouter = require('./routes/demand');
const CategoryRouter = require('./routes/categories');


app.use('/uniform', UniformRouter);
app.use('/cadets', CadetsRouter);
app.use('/demand', DemandRouter);
app.use('/categories', CategoryRouter);
app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);

});