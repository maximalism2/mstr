var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/learn');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the data base');
});

var kittySchema = mongoose.Schema({
  name: String
});

kittySchema.methods.speak = function() {
  var greeting = "I don't have a name";
  if (this.name) {
    greeting = `Meow name is ${this.name}`;
  }
  console.log(`Greeting: ${greeting}`);
}

Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'Fluffy' });
fluffy.speak();

var spike = new Kitten({ name: 'Spike' });
spike.speak();

var chuck = new Kitten({ name: 'Chuck' });
chuck.speak();

fluffy.save((err, fluffy) => {
  if (err) return console.error(err);
  fluffy.speak();
});

spike.save((err, spike) => {
  if (err) return console.error(err);
  spike.speak();
});

chuck.save((err, fluffy) => {
  if (err) return console.error(err);
  fluffy.speak();
});

Kitten.find((err, kittens) => {
  if (err) return console.error(err);
  console.log(kittens);
})
