const router = require('express').Router();
let Cadets = require('../models/cadets.model')
let UniformItems = require('../models/uniform.model')
let UniformIssued = require('../models/uniformissued.model')

router.route('/').get((req,res) =>{
    Cadets.find({Name: {$ne : "Deleted"}})
        .then(Cadets => res.json(Cadets))
        .catch(err => res.status(400).json('Error: '+ err))

});

router.route('/:id').get((req,res) =>{
    Cadets.findOne({_id: req.params.id})
        .then(Cadets => res.json(Cadets))
        .catch(err => res.status(400).json('Error: '+ err))

});
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

router.route('/:id/loanrecord').get((req,res) =>{
    UniformIssued.aggregate([
        {$match: { 
            Cadets: ObjectId(req.params.id),
            DateReturned: null
            }
        },

        {$group: {
                _id: {Cadets: "$Cadets",UniformItem: "$UniformItem"},
                CadetID: {$addToSet: "$Cadets"},
                UniformItemID: {$addToSet: "$UniformItem"},
                count: {$sum: 1}
                }           

        },        

        {
            $lookup:
              {
                from: "UniformItems",
                localField: "UniformItemID",
                foreignField: "_id",
                as: "UniformItem"
              }
            },
              {
                $lookup:
              {
                from: "Cadets",
                localField: "CadetID",
                foreignField: "_id",
                as: "Cadet"
              }            
         },


    ])
   
        //UniformIssued.populate({path: 'Cadets'})
//    .populate('UniformItem')
        .then(UniformIssued => res.json(UniformIssued))
        .catch(err => res.status(400).json('Error: '+ err))

});


router.route('/:id').delete((req,res) =>{
    Cadets.findByIdAndUpdate(req.params.id, {Name: "Deleted"})
        .then(Cadets => res.json(Cadets))
        .catch(err => res.status(400).json('Error: '+ err))

});


router.route('/add').post((req,res) =>{

    const Name= req.body.Name;
    const Gender = req.body.Gender;


    const newCadet = new Cadets({
        Name,
        Gender,
    
    });
    newCadet.save()
    .then(() => res.json('Cadet Added'))
    .catch(err => res.status(400).json('Error: '+ err))



});

console.log(`redirecting to cadets`);

module.exports = router