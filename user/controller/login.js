const User = require('../middleware/user');

const userLogin = (req,res) => {
    const {userName, password} = req.body;
    User.findOne({username: userName}, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.json({status: 'ok', message: 'login success'});
            } else {
                res.json({status: 'error', message: err});
            }
        } else {
            res.send("not register")
        }
    })
}

module.exports = userLogin;