const mongoose = require('mongoose');
const Promos = require('./models/promotions');

const url = 'mongodb://localhost:27017/assignment2';

mongoose.connect(url, {useMongoClient: true});

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function () {
  const newPromo = Promos({
    name: 'Weekend Grand Buffet',
    image: 'images/buffet.png',
    label: 'New',
    price: '19.99',
    description: 'Featuring . . .'
  });

  newPromo.save(function (err) {
    if (err) throw err;
    console.log('Promotion successfully created');
    console.log('---------------------------');
    Promos.find({}, function (err, promotions) {
      if (err) throw err;
      console.log('Have been encountered: ' + promotions.length);
      console.log(promotions);

      db.collection('promotions').drop(function () {
        db.close();
      });
    });
  });
});
