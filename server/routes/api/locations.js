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
    .catch(err => res.status(404).json({ success: false }));
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
    .catch(err => res.status(404).json({ success: false }));
});

//@route DELETE api/locations/:id
//@desc Delete a location
//@access Public for now, it is gonna be just for Admin in future
router.delete('/:id', (req, res) => {
    Location.findById(req.params.id)
    .then(location => location.remove()
    .then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});





module.exports = router; 