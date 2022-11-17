const logout = (req, res) => {
    req.logout();

    // destroy session data
    req.session = null;

    // redirect to homepage
    res.redirect('/login');
}

module.exports = logout;