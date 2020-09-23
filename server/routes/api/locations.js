const express = require('express');
const router = express.Router();

//Location Model
const Location = require('../../models/Location');

//@route GET api/locations
//@desc Get All Locations
//@access Public for now, it is gonna be just for Admin in future
router.get('/', (req, res) => {
    Location.find()
    .sort({ date: -1 })
    .then(Locations => res.json(Locations))
});

//@route POST api/locations
//@desc Create a location
//@access Public for now, it is gonna be just for Admin in future
router.post('/', (req, res) => {
    const newLocation = new Location({
        title: req.body.title,
        description: req.body.description,
        adresse: req.body.adresse,
        price: req.body.price,
        capacity: req.body.capacity,
        image: req.body.image
    });
    newLocation.save()
    .then(location => res.json(location))
});



module.exports = router; 