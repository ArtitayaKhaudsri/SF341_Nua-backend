const mongoose = require("mongoose");

//connect mongoDB
const mongo_uri = "mongodb+srv://Nua:aU3qA9fnZPswqbG9@clusternua.mzaxzrc.mongodb.net/test?retryWrites=true&w=majority"

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true }).then(() => {
        console.log("[success] task 2 : connected to the database ");
    },
    error => {
        console.log("[failed] task 2 " + error);
        process.exit();
    }
);

const favoriteSchema = new mongoose.Schema({
    like: Array,
    memu: String,
})

const Favorite = new mongoose.model("Favorite", favoriteSchema)

module.exports = Favorite;