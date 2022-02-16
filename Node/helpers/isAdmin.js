module.exports = {
    isAdmin : function(req, res, next) {
        if (req.isAuthenticated() && req.user.is_admin) {
            next();
        }
        else {
            req.flash('error_msg', 'Você não tem permissão para acessar esta página!');
            res.redirect('/');
        }
    }
}