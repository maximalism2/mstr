module.exports = function (req, res, next){
  req.isAuthenticated()
    ? next()
    : console.log('not authenticated');
};