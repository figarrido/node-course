const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/assignment2';

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function () {
  console.log('Successfully connected!');

  const newDish = Dishes({
    name: 'Uthapizza',
    image: 'images/uthapizza.png',
    category: 'mains',
    label: 'Hot',
    price: '4.99',
    description: 'A unique . . .',
    comments: [
      {
        rating: 5,
        comment: 'Imagine all the eatables, living in conFusion!',
        author: 'John Lemon'
      },
      {
        rating: 4,
        comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
        author: 'Paul McVites'
      }
    ]
  });

  newDish.save(function (err) {
    if (err) throw err;
    console.log('New dish has been created');
    Dishes.find({}, function (err, dishes) {
      if (err) throw err;
      console.log('--------------------------');
      console.log('Have been encountered: ' + dishes.length);
      console.log(dishes);
      console.log(dishes[0].comments);

      db.collection('dishes').drop(function () {
        db.close();
      });
    });
  });
});
