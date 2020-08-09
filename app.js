const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dblec'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  // connection.query(
  //   'SELECT * FROM teams',
  //   (error, results) => {
  //     console.log(results);
  //     res.render('hello.ejs');
  //   }
  // );
  res.render('top.ejs');
});

app.get('/team_list', (req, res) => {
  connection.query(
    'SELECT * FROM teams',
    (error, results) => {
      console.log(results);
      res.render('team_list.ejs');
    }
  );
});

app.get('/player_list', (req, res) => {
  connection.query(
    'SELECT * FROM players',
    (error, results) => {
      console.log(results);
      res.render('player_list.ejs');
    }
  );
});

app.listen(3000);