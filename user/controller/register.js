const User = require('../middleware/user');

const register = (req,res)=>{
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
}

module.exports = register;