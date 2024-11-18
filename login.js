const mysql =require("mysql");
const express = require("express");
const bodyParser =require("body-parser")
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Anikesh1207",
    database: "nodejs"
});

//connecting to data base
connection.connect(function(error){
    if (error) throw error 
    else console.log("connected to the database successfully!")
})

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("slect * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error, result, fields ){
        if (result.length > 0) {
            res.redirect("/welcome")
        } else {
            res.redirect("/")
        }
        res.end();
    })
})

// when login is sucess
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "index.html")
})



//set apps port

app.listen(4350);