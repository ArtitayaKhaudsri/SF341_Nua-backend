const express = require('express');
const cors = require('cors'); //This makes it not necessary that the server is connected to the same machine.
const app = express();
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

app.use(cors())

app.use(express.static("./addRecipe/public"));
app.use(express.static("./addRecipe/data/uploads"));
app.use('/api', recipeRouter);

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});

app.post('/register', jsonParser, function (req, res, next){
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

})

app.listen(3410, function (req, res) {
    console.log('Port is listing');
});