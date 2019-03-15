const http = require('http');
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 3000;

const getRandomCity = (cities) => cities[Math.floor(Math.random() * cities.length)];

const createServer = (db) => {
  http.createServer((req, res) => {
    db.collection('cities').find().toArray((err, result) => {
      if (err) {
        return console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      const city = getRandomCity(result);
      return res.end(JSON.stringify(city));
    });
  }).listen(port, () => {
    console.log(`Server start at port ${port}`);
  });
};

MongoClient.connect('mongodb://localhost', (err, client) => {
  if (err) {
    return console.log(err);
  }

  const db = client.db('learningProject');
  return createServer(db);
});
