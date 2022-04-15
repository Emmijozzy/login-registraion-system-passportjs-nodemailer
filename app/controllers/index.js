// Dependencies

// initialization of controller container
const controllers = {};

// landing page
controllers.landingPage = (req, res) => {

}

controllers.homePage = (req, res) => {
  console.log(req.flash())
  res.send("am at home")
}

module.exports = controllers