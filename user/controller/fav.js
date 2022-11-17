const Favorite = require('../middleware/favorite');
const User = require('../middleware/user');

const f = async (req,res)=>{
    const {a,b} =req.body;
    console.log(a); 
    res.send({message:"hi"});
    var req = await Favorite.find();
    console.log(req);
    
}

module.exports = f;