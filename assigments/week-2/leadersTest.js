const mongoose = require('mongoose');
const Leaders = require('./models/leadership');

const url = 'mongodb://localhost:27017/assignment2';

mongoose.connect(url, {useMongoClient: true});

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function () {
  const newLeader = Leaders({
    name: 'Peter Pan',
    image: 'images/alberto.png',
    designation: 'Chief Epicurious Officer',
    abbr: 'CEO',
    description: 'Our CEO, Peter, . . .'
  });

  newLeader.save(function (err) {
    if (err) throw err;
    console.log('Leader successfully created');
    console.log('---------------------------');
    Leaders.find({}, function (err, leaders) {
      if (err) throw err;
      console.log('Have been encountered: ' + leaders.length);
      console.log(leaders);
      db.collection('leaders').drop(function () {
        db.close();
      });
    });
  });
});
