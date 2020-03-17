const router = require('express').Router();
let DemandReasons = require('../models/reason.model')
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;


router.route('/').get((req,res) =>{
    Uniform.find()
        .then(Uniform => res.json(Uniform))
        .catch(err => res.status(400).json('Error: '+ err))

});

router.route('/reasons').get((req,res) =>{
    DemandReasons.find()
        .then(DemandReasons => res.json(DemandReasons))
        .catch(err => res.status(400).json('Error: '+ err))

});

router.route('/categories/:Category').get((req,res) =>{
    Uniform.find({"Category":req.params.Category})
        .then(Uniform => res.json(Uniform))
        .catch(err => res.status(400).json('Error: '+ err))

});
router.route('/:NSN/').get((req,res) =>{
    Uniform.find({"NSN":req.params.NSN})
    .then(Uniform => res.json(Uniform))
    .catch(err => res.status(400).json('Error: '+ err))

});

router.route('/:NSN/incrementstock').post((req,res) =>{
    Uniform.findOneAndUpdate({"NSN":req.params.NSN}, {$inc: { StockQty: 1}}, {new:1})
        .then(Uniform => res.json(Uniform))
        .catch(err => res.status(400).json('Error: '+ err))

});
router.route('/:NSN/decrementstock').post((req,res) =>{
    Uniform.findOneAndUpdate({"NSN":req.params.NSN}, {$inc: { StockQty: -1}}, {new:1})
        .then(Uniform => res.json(Uniform))
        .catch(err => res.status(400).json('Error: '+ err))

});

router.route('/issue/').post((req,res) =>{
    const  Cadets = req.body.CadetID;
    const UniformItem = req.body.UniformItemID;
    const DateIssued = Date(req.body.DateIssued);


    const newIssue = new UniformIssue({
        Cadets,
        UniformItem,
        DateIssued,
    });
    newIssue.save()
    .then(() => res.status(201).json('Uniform Issued'))
        .catch(err => res.status(400).json('Error: '+ err))

});
router.route('/return/').put((req,res) =>{
console.log(req.body.CadetID)
    UniformIssue.findOneAndUpdate({"Cadets":ObjectId(req.body.CadetID),"UniformItem":ObjectId(req.body.UniformItemID),"DateReturned": null},  { $currentDate:{ DateReturned: true},})

    .then(Uniform => res.status(201).json(Uniform))
        .catch(err => res.status(400).json('Error: '+ err))

});

router.route('/add').post((req,res) =>{

    const NSN = req.body.NSN;
    const Category = req.body.Category;
    const StockQty = Number(req.body.StockQty);
    const Size1 = req.body.Size1;
    const Size2 = req.body.Size2;
    const Size3 = req.body.Size3;

    const newUniformItem = new Uniform({
        NSN,
        Category,
        StockQty,
        Size1,
        Size2, 
        Size3,     
    });
    newUniformItem.save()
    .then(() => res.json('Uniform Added'))
    .catch(err => res.status(400).json('Error: '+ err))



});
console.log(`redirecting to uniform`);

module.exports = router


