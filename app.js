/********************************************************************************* 
*  WEB322 – Assignment 4 
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.   
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including web sites) or distributed to other students. 
*  
*  Name: ______Pratham Garg________________ Student ID: ___117900217___________ Date: ___30-11-2022_____________
********************************************************************************/

const { response } = require("express")

const express = require('express')

const app = express()

const request = require('request')

//set the view engine as ejs to use ejs file

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, () => {
    console.log("*******App is listening at port 3000*******")
});
app.get("/insert", (req, res) => {
    res.render("insert.ejs")
})
app.post('/insert', (req, res) => {
    //to get the form data out of request body we need body parser
    // require bodypaeser and use one of its features before using request body
    const data = req.body;
    console.log(data);

    const pgNum = data.pNum
    res.redirect(`/pics/+${pgNum}`)


})

app.get('/pics/:pgNum', (req, res) => {


    const pgNumber = req.params.pgNum;

    console.log(pgNumber);

    request(`https://api.unsplash.com/photos/?client_id=_hOg7aEIUBbybgWDqVbpB8_4qnur8f7URgAcE-AxxvA&page=${pgNumber}`, (error, response, body) => {

        if (error) {
            console.log(error)

        }
        else {
            const data = JSON.parse(body)
            console.log(data)
            res.render("pics.ejs", {
                pics: data
            })
        }
    })
})

