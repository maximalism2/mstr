var passport = require('passport');

module.exports = function(req, res, next) {

  console.info('someone trying to login');
  var custBody = [];
  req.on('data', (data) => {
    var bodyOfRequest = JSON.parse(data.toString('utf8'));
    req.body = bodyOfRequest;
    passport.authenticate('local',
      function(err, user, info) {
        return err
          ? next(err)
          : user
            ? req.logIn(user, function(err) {
                return err
                  ? next(err)
                  : res.redirect('/');
              })
            : res.json(info);
      }
    )(req, res, next);
  });
};