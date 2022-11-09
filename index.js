const express = require('express');
const cors = require('cors'); //This makes it not necessary that the server is connected to the same machine.
const app = express();
const mongoose = require("mongoose");
//help get information
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//connect to database
const mysql = require('mysql2');
//Make the code not display in the database. for user safety
const bcrypt = require('bcrypt');
const saltRounds = 10;
//pull token
const jwt = require('jsonwebtoken');

const recipeRouter = require('./addRecipe/recipes/recipeRouter');
const {hash} = require("bcrypt");

//connect mongoDB
const mongo_uri = "mongodb+srv://Nua:aU3qA9fnZPswqbG9@clusternua.mzaxzrc.mongodb.net/?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(
    () => {
        console.log("[success] task 2 : connected to the database ");
    },
    error => {
        console.log("[failed] task 2 " + error);
        process.exit();
    }
);

app.use(cors({origin: true}))

// Commands to convert JSON values to be able to retrieve and send values to MongoDB Atlas.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./addRecipe/public"));
app.use(express.static("./addRecipe/data/uploads"));
app.use('/api', recipeRouter);

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb' //http://localhost/phpmyadmin/
});
//user schema
const userSchema = new mongoose.Schema({
    userName: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//routes routes
app.post("/login",(req,res)=>{
    const {userName,password} =req.body;
    User.findOne({username:userName},(err,user)=>{
        if(user){
            if(password === user.password){
                res.json({status: 'ok', message: 'login success'});
            }else{
                res.json({status: 'error', message: err});
            }
        }else{
            res.send("not register")
        }
    })
});

app.post("/register",(req,res)=>{
    console.log(req.body)
    const {userName,password} =req.body;
    User.findOne({userName:userName},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({userName,password})
            user.save(err=>{
                if(err){
                    res.json({status: 'error', message: err})
                }else{
                    res.json({status: 'ok'});
                }
            })
        }
    })
})

/*app.post('/register', jsonParser, function (req, res, next){
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'INSERT INTO user (userName, password) VALUES (?, ?)' ,
            [req.body.userName, hash],
            function(err, results, fields) {
                if (err) {
                    res.json({status: 'error', message: err})
                    return
                }
                res.json({status: 'ok'});
            }
        );
    });
});

app.post('/login', jsonParser, function (req, res, next){
    connection.execute(
        'SELECT * FROM user WHERE userName=?' ,
        [req.body.userName],
        function(err, user, fields) {
            if (err) {
                res.json({status: 'error', message: err});
                return
            }
            if (user.length == 0) {
                res.json({status: 'error', message: "no user found"});
                return
            }
            //Does the code and code in the database match?
            bcrypt.compare(req.body.password, user[0].password, function (err, isLogin) {
                if (isLogin) {
                    const token = jwt.sign({ userName: user[0].userName }, 'Fullstack-Login', { expiresIn: '1h' });
                    res.json({status: 'ok', message: 'login success', token});
                } else {
                    res.json({status: 'error', message: 'login failed'});
                }
            })
        }
    );
})

app.post('/authen', jsonParser, function (req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'Fullstack-Login');
        res.json({status: "ok", decoded})
    } catch (error) {
        res.json({status: "error", message: error.message})
    }

})*/

const port = process.env.PORT || 3410;

app.listen(port, function (req, res) {
    console.log('Port is listing');
});