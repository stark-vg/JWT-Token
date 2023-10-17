const express = require('express');         //import express from 'express';    if  type : "module" in package.json

const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'secretKey';

const port = process.env.PORT || 5000;

app.get('/', async(req, res) => {
    res.json({
        message: 'Welcome'
    })
});


app.post('/login', async(req, res) => {
    const user = {
        id:1,
        username:"admin",
        email:"admin@example"
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token) => {
        res.json({token})
    })
})


app.post('/profile', verifyToken, async(req, res) => {
    jwt.verify(req.token,secretKey,(err,authData) => {
        if(err){
            res.send({
                result : "invalid token",
            })
        }
        else {
            res.json({
                message : 'Profile Accessed',
                authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }
    else{
        res.send({
            result:'Token is not Valid'
        })
    }
} 


app.listen(port,() => {
    console.log(`Server is working on PORT: ${port}`);
});








// import http from "http";    //OR     const http = require("http");


// const server = http.createServer((req,res) => {
//     // console.log("Starting server");
//     if(req.url === "/about") {
//         res.end("<h1>About</h1>");
//     }   else if(req.url === "/") {
//         res.end("<h1>/</h1>");
// }});

// server.listen(5000, () => {
//     console.log("Server is working");
// });