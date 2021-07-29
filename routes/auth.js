const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const SALT= 15; 

router.get("/signin", (req, res, next)=>{
    res.render("auth/signin.hbs");
});


router.get("/signup", (req, res, next)=>{
    res.render("auth/signup.hbs");
});

router.post("/signup", async (req, res, next)=>{
   
    try {
        const user = req.body;

        if (!user.password || !user.username) {
            res.render("auth/signup.hbs", {
                errorMessage:"Provide a username and/or a password",
            });
            return;
        } 

        const foundUser = await User.findOne({username : user.username });

        if(foundUser){
            res.render("auth/signup.hbs", {
                errorMessage:"Ooops sombody got it already",
            });
            return

            
        }

        const hashedPassword = bcrypt.hashSync(user.password,SALT);
            user.password = hashedPassword;
    
            const createdUser = await User.create(user);
    
            res.redirect("/auth/signin.hbs");
       


    } catch(error){
        next(error);
    }

});


module.exports = router;