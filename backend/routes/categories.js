const router = require('express').Router();
let Categories = require('../models/categories.model')
const mongoose = require('mongoose');


router.route('/').get((req,res) =>{
    Categories.find()
        .then(Categories => res.json(Categories))
        .catch(err => res.status(400).json('Error: '+ err))

});



router.route('/:Category').get((req,res) =>{
    Categories.findOne({"Category":req.params.Category})
        .then(Categories => res.json(Categories))
        .catch(err => res.status(400).json('Error: '+ err))

});
console.log(`redirecting to categories`);

module.exports = router


