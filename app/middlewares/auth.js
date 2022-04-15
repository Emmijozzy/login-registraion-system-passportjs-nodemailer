
 const isLoggedIn = async (req, res, next) => {
	//  console.log(req)
	if(req.isAuthenticated()){
		 next();
	} else {
		//req.flash('error_msg', 'You are not logged in.');
		res.redirect('/api/login');
	}
	// return next()
}

module.exports = isLoggedIn;