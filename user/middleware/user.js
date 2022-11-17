const mongoose = require("mongoose");

//connect mongoDB
const mongo_uri = "mongodb+srv://Nua:aU3qA9fnZPswqbG9@clusternua.mzaxzrc.mongodb.net/test?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(() => {
        console.log("[success] task 1 : connected to the database ");
    },
    error => {
        console.log("[failed] task 1 " + error);
        process.exit();
    }
);

const userSchema = new mongoose.Schema({
    userName: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

module.exports = User;