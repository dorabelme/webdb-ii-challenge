const express = require("express");
const db = require("../data/dbHelpers.js");

const router = express.Router();

// GET requests for projects
router.get('/', (req, res) => {
    db.get()
        .then(cars => res.status(200).json(cars))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The cars information could not be retrieved." });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.getById(id)
        .then(car => {
            console.log(car);
            if (car) {
                res.status(200).json(car);
            } else {
                res.status(404).json({ error: "Car with ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Error getting the car from the database." });
        });
});


// POST request for projects
router.post('/', (req, res) => {
    const { id } = req.params;
    const { VIN, make, model, mileage } = req.body;
    if (!VIN || !make || !model || !mileage ) {
        return res.status(400).json({ error: "Requires VIN, make, model, and mileage." });
    }
        db.insert({ VIN, make, model, mileage, 'transmission type': req.body['transmission type'], 'status of the title': req.body['status of the title'] })
                .then(car => {
                    console.log(car);
                    if (car) {
                        res.status(201).json(car);
                    } else {
                        res.status(404).json({ error: "Car with ID does not exist." })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Server error retrieving car." });
                })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error inserting car." });
        });
});


// DELETE request for projects
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(car => {
            console.log(car);
            if (car) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: "Car with ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error deleting car." });
        });
});


// PUT request for projects
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { VIN, make, model, mileage } = req.body;
    if (!VIN || !make || !model || !mileage) {
        return res.status(400).json({ error: "Requires VIN, make, model, and mileage." });
    }

    db.update(id, { VIN, make, model, mileage, 'transmission type': req.body['transmission type'], 'status of the title': req.body['status of the title'] })
        .then(updated => {
            console.log(updated);
            if (updated) {
                db.getById(id)
                    .then(car => res.status(200).json(car))
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "Error retrieving car." });
                    });
            } else {
                res.status(404).json({ error: "Car with ID is not found." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error updating car." });
        });
});


module.exports = router;

