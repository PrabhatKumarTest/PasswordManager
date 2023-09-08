// Moodule Import
const express = require('express');
const { body, validationResult } = require('express-validator');
const FetchAllPass = require('../middleware/FetchAllPass')

// Moongoose Scheme import
const Pass = require('../modals/Pass');
const { find } = require('../modals/User');

//  Router Initilization
const router = express.Router();

// Crud Operations 

// Rout:1 > Add Passwords on http://localhost:5000/addpass :: Create
router.post('/addpass', FetchAllPass, [
    body('website', 'website can not be blank').notEmpty(),
    body('username', 'username can not be blank').notEmpty(),
    body('password', 'password can not be blank').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    //condition that checks if there are any error. which return the error
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newPass = await new Pass({
            user: req.user.id,
            website: req.body.website,
            username: req.body.username,
            password: req.body.username
        })
        const savedPass = await newPass.save();
        res.send(savedPass);
    } catch (error) {
        res.status(401).send({ error });
    }
})

// Rout:2 > Get All Pass on http://localhost:5000/fetchallpass :: Read
router.get('/fetchallpass', FetchAllPass, async (req, res) => {
    try {
        // Find all Notes of a user whose id will be received from middleware function via jwdToken 
        const allPass = await Pass.find({ user: req.user.id });
        res.status(200).json({ allPass })

    } catch (error) {
        res.status(400).json({ error })
    }
})

// Rout:3 > Update Pass on http://localhost:5000/updatepass :: Update
router.put('/updatepass/:id', FetchAllPass, async (req, res) => {
    try {
        const { website, username, password } = req.body;
        const updatednotes = {}

        // Updating updatednotes with the data received from req header 
        if (website) {
            updatednotes.website = website;
        }
        if (username) {
            updatednotes.username = username;
        }
        if (password) {
            updatednotes.password = password;
        }

        // Preparing a new Pass from the id provided with url
        let newPass = await Pass.findById(req.params.id)

        if (!newPass) {
            res.status(404).send("Details not found")
        }
        const id = newPass.user.toString()

        // Matching the user with the user from jwtToken
        if (id !== req.user.id) {
            return res.status(420).send("Not Authorised")
        }

        // Updating the note in Database
        newPass = await Pass.findByIdAndUpdate(req.params.id, updatednotes, { $set: updatednotes }, { new: true });

        // Fetching the new Updated Pass from DataBase
        const pass = await Pass.findById(req.params.id)
        res.status(200).json({ pass })

    } catch (error) {
        res.status(500).json({ error })
    }
})

// Rout:3 > Update Pass on http://localhost:5000/updatepass :: Delete
router.delete('/deletepass/:id', FetchAllPass, async (req, res) => {
    try {
        // Preparing a new Pass from the id provided with url
        let newPass = await Pass.findById(req.params.id)

        if (!newPass) {
            res.status(404).send("Details not found")
        }
        const id = newPass.user.toString()

        // Matching the user with the user from jwtToken
        if (id !== req.user.id) {
            return res.status(420).send("Not Authorised")
        }

        // Updating the note in Database
        newPass = await Pass.findByIdAndDelete(req.params.id)
        res.status(200).json({ Sucess : "Deleted Successfully ", newPass })

    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router