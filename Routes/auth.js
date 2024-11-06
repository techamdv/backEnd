// routes/userRoutes.js
const express = require('express');
require('dotenv').config();
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken')
const fetchUser = require("../middleware/fetchUser")


const User = require('../Models/User'); // Import the User model
const router = express.Router();

// Create a new user

router.post('/',[
    body("username").isLength({min: 6, max: 15}),
    body("password").isLength({min: 6, max: 15}),

], async (req, res) => {
    try {
        const err = validationResult(req)
        if(!err.isEmpty() ){
            return res.status(400).json(err)
        }

        const salt =  await bcrypt.genSalt(10);
        // console.log(salt);
        
        const EnyPass = await bcrypt.hash(req.body.password , salt)
        const newUser =  User(
            {
                username : req.body.username,
                password : EnyPass
            }); 
            
        const data = {
            user : {
                id: newUser.id
            }
        }
        const token = JWT.sign(data,process.env.JWT_SECRET,{expiresIn:"1h"})
        console.log(token);
        
        await newUser.save();
        return res.status(201).json({TOKEN : token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post('/login',[
    body("username").isLength({min: 6, max: 15}),
    body("password").isLength({min: 6, max: 15}),

], async (req, res) => {
    try {
        
        const err = validationResult(req)
        // console.log("err",err);

        if(!err.isEmpty() ){
            // console.log("validation error");
            return res.status(400).json(err) 
        }

        const {username, password } = req.body
        // console.log("username :",username);
        
        const oldUser =await User.findOne({username})
        // console.log("old user :",oldUser);
        
        if(!oldUser){
            console.log("incorrect credentials");
            return res.status(400).json({status : "failure" });
        }
        else{
            const isUser =  await bcrypt.compare(password,oldUser.password)
            if(isUser){
                const data = {
                    user : {
                        id: oldUser.id
                    }
                }
                const token = JWT.sign(data,process.env.JWT_SECRET,{expiresIn:"1h"})
                console.log(token);  
                
                return res.status(201).json({status : "success" ,TOKEN : token});
            }else{
                console.log("incorrect credentials 2");
                return res.status(400).json({status : "failure" });     
            }
        }  
        } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Get all users
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific user by ID
router.get('/',fetchUser, async (req, res) => {
    try {

        console.log(req.user.id);
        
        const userId = req.user.id ;
        
        const user = await User.findById({_id:userId}).select("-password");
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(404).json({data:user});
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
   
    }
});

module.exports = router;
