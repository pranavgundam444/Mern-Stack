const express = require("express");
const mongoose = require("mongoose")
const User = require("../models/userModel")

const router = express.Router();

router.post('/', async (req,res) => {
    const {name, email, age} = req.body;
    try {
        const userData = await User.create({
            name: name,
            email: email,
            age: age,
        });
        res.status(201).json(userData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
})

router.get('/', async (req,res) => {
    
    try {
        const showData = await User.find();
        res.status(200).json(showData);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

router.get('/:id', async (req,res) => {
    const {id} = req.params
    try {
        const singleUser = await User.findById({_id: id});
        res.status(200).json(singleUser);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const deleteData = await User.findByIdAndDelete({_id: id});
        res.status(200).json(deleteData);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const {name, Email, age} = req.body
    try {
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedData);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

module.exports = router;
