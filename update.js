const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'myTeam';

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/players', (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    db.collection('team').find().toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
});

app.post('/players', (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    const player = req.body;
    db.collection('team').insertOne(player, (err, result) => {
      if (err) throw err;
      res.send(`Player added with id: ${result.insertedId}`);
      client.close();
    });
  });
});

app.put('/players/:id', (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    const id = req.params.id;
    const newPlayer = req.body;
    db.collection('team').updateOne({_id: id}, {$set: newPlayer}, (err, result) => {
      if (err) throw err;
      res.send(`Player updated with id: ${id}`);
      client.close();
    });
  });
});

app.delete('/players/:id', (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    const id = req.params.id;
    db.collection('team').deleteOne({_id: id}, (err, result) => {
      if (err) throw err;
      res.send(`Player deleted with id: ${id}`);
      client.close();
    });
  });
});

app.post('/query', (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    const query = req.body;
    db.collection('team').find(query).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      client.close();
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
