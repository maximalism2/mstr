var fs = require('fs');
var gm = require('gm');

gm('./public/images/400_400/default.png')
  .resize(200, 200)
  .noProfile()
  .write('./public/images/200_200/default.png', err => {
    err ? console.log(err) : null;
  })

gm('./public/images/400_400/default.png')
  .resize(50, 50)
  .write('./public/images/50_50/default.png', err => {
    err ? console.log(err) : null;
  });