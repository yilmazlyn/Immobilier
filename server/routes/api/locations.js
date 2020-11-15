const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

//Location Model
const Location = require('../../models/Location')

//@route GET api/locations
//@desc Get All Locations
//@access Public for now, it is gonna be just for Admin in future
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const locations = await Location.find({})

    res.json(locations)
  })
)

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
    image: req.body.image,
  })
  newLocation
    .save()
    .then((location) => res.json(location))
    .catch((err) => res.status(404).json({ success: false + err }))
})

//@route DELETE api/locations/:id
//@desc Delete a location
//@access Public for now, it is gonna be just for Admin in future
router.delete('/:id', (req, res) => {
  Location.findById(req.params.id)
    .then((location) =>
      location.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }))
})

//@route PUT api/locations/:id
//@desc update a location
//@access Public for now, it is gonna be just for Admin in future
router.put('/update/:id', (req, res) => {
  Location.findById(req.params.id)
    .then((location) => {
      ;(location.title = req.body.title),
        (location.description = req.body.decription),
        (location.adresse = req.body.adresse),
        (location.price = req.body.price),
        (location.capacity = req.body.capacity),
        location
          .update()

          .then(() => res.json({ success: true }))
          // return 404 if not found
          .catch((err) => res.status(404).json({ success: false + err }))
    })

    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
