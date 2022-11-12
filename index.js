const express = require('express');
const cors = require('cors'); //This makes it not necessary that the server is connected to the same machine.
const app = express();
const bodyParser = require('body-parser');
const recipeRouter = require('./addRecipe/recipes/recipeRouter');
const loginRouter = require('./user/router/loginRouter');
const registerRouter = require('./user/router/registerRouter');

const ip = 'current_local_ip'

console.log(ip)

app.use(cors());

// Commands to convert JSON values to be able to retrieve and send values to MongoDB Atlas.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./addRecipe/public"));
app.use(express.static("./addRecipe/data/uploads"));
app.use('/api', recipeRouter);

//routes routes
app.post("/login", loginRouter);

app.post("/register",registerRouter)

const port = process.env.PORT || 3410;

app.listen(port, '0.0.0.0',function (req, res) {
    console.log('Port is listing');
});