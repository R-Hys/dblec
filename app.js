const express = require('express');
const mysql = require('mysql');

const app = express();

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

app.listen(3000);