const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

// GET requests for projects
router.get('/', (req, res) => {
    db("cars")
        .then(cars => res.status(200).json(cars))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The cars information could not be retrieved." });
        });
});

router.get('/:id', (req, res) => {
    db("cars")
        .where({ id: req.params.id })
        .first()
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
    console.log(req.body);
    // const { name, budget } = req.body;
    if (!req.body.VIN || !req.body.make || !req.body.model || !req.body.mileage ) {
        return res.status(400).json({ error: "Requires VIN, make, model, and mileage." });
    }
    db("cars")
        .insert({ VIN: req.body.VIN, make: req.body.make, model: req.body.model, mileage: req.body.mileage, 'transmission type': req.body['transmission type'], 'status of the title': req.body['status of the title'] })
        .then(([id]) => {
            db("cars")
                .where({ id })
                .first()
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
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Server error inserting car." });
        });
});


// DELETE request for projects
router.delete('/:id', (req, res) => {
    db("cars")
        .where({ id: req.params.id })
        .del()
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
    if (!req.body.VIN || !req.body.make || !req.body.model || !req.body.mileage) {
        return res.status(400).json({ error: "Requires VIN, make, model, and mileage." });
    }

    db("cars")
        .where({ id: req.params.id })
        .update({ VIN: req.body.VIN, make: req.body.make, model: req.body.model, mileage: req.body.mileage, 'transmission type': req.body['transmission type'], 'status of the title': req.body['status of the title'] })
        .then(updated => {
            console.log(updated);
            if (updated) {
                db("cars")
                    .where({ id: req.params.id })
                    .first()
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

