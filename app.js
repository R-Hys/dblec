const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dblec'
});


let sum = function(arr) {
  var sum = 0; var ave = 0;
  for (var i=0,len=arr.length; i<len; ++i) {
      sum += arr[i];
  };
  return sum;
};
let ave = (arr) => {
  return sum(arr) / arr.length;
}

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/team_list', (req, res) => {
  connection.query(
    'SELECT * FROM teams ORDER BY name ASC',
    (error, results) => {
      // console.log(results);
      res.render('team_list.ejs', {teams: results});
    }
  );
});

app.get('/team_list/:id', (req, res) => {
  connection.query(
    'SELECT players.id as player_id,players.last_name,players.first_name,teams.name AS team_name,games.year,games.season,games.date,games.which_num as game_num,games.rank_num,games.point FROM players JOIN teams ON teams.id = players.team_id join games on players.id = games.player_id WHERE teams.id = ?',
    [req.params.id],
    (error, results) => {
      function filterUniqueItemsById (array) {
        const itemIds = array.map(function(item) {
          return item.last_name;
        });
        return array.filter(function(item, index) {
          return itemIds.indexOf(item.last_name) === index;
        });
      }
      const players_list= filterUniqueItemsById(results);

      let score_list = results.map(x => x.point);
      let rank_list = results.map(x => x.rank_num);
      let score = sum(score_list)/10;
      let ave_score = Math.floor(ave(score_list) * 100)/1000;
      let ave_rank = Math.floor(ave(rank_list) * 100)/100;
      let game_num = results.length;
      let aves = new Object();
      aves['score'] = score; aves['ave_score'] = ave_score; aves['ave_rank'] = ave_rank; aves['game_num'] = game_num;
      res.render('team_data.ejs', {players: players_list, ave_data:aves});
    }
  );
});

app.post('/team_search', (req, res) => {
  connection.query(
    'SELECT * FROM teams WHERE teams.name LIKE ?',
    "%"+[req.body.teamName]+"%",
    (error, results) => {
      console.log(req.body.teamName);
      console.log(results);
      if(results === undefined) res.redirect('/');
      else res.render('team_list.ejs', {teams: results});
    }
  );
});

app.get('/player_list', (req, res) => {
  connection.query(
    'SELECT * FROM players',
    (error, results) => {
      // console.log(results);
      res.render('player_list.ejs', {players: results});
    }
  );
});

app.get('/player_list/:id', (req, res) => {
  connection.query(
    'SELECT players.last_name,players.first_name,teams.id AS team_id,teams.name AS team_name,games.year,games.season,games.date,games.which_num as game_num,games.rank_num,games.point FROM players JOIN teams ON teams.id = players.team_id join games on players.id = games.player_id WHERE players.id = ?',
    [req.params.id],
    (error, results) => {
      let score_list = results.map(x => x.point);
      let rank_list = results.map(x => x.rank_num);
      let score = sum(score_list)/10;
      let ave_score = Math.floor(ave(score_list) * 100)/1000;
      let ave_rank = Math.floor(ave(rank_list) * 100)/100;
      let game_num = results.length;
      let aves = new Object();
      aves['score'] = score; aves['ave_score'] = ave_score; aves['ave_rank'] = ave_rank; aves['game_num'] = game_num;
      res.render('player_data.ejs', {data:results,ave_data:aves});
      // res.redirect('/');
    }
  );
});

app.post('/player_search_last', (req, res) => {
  connection.query(
    'SELECT * FROM players WHERE players.last_name LIKE ?',
    "%"+[req.body.playerLastName]+"%",
    (error, results) => {
      console.log(req.body.teamName);
      console.log(results);
      if(results !== undefined) {
        res.render('player_list.ejs', {players: results});
      } else {
        res.redirect('/');
      }
    }
  );
});

app.post('/player_search_first', (req, res) => {
  connection.query(
    'SELECT * FROM players WHERE players.first_name LIKE ?',
    "%"+[req.body.playerFirstName]+"%",
    (error, results) => {
      console.log(req.body.teamName);
      console.log(results);
      if(results !== undefined) {
        res.render('player_list.ejs', {players: results});
      } else {
        res.redirect('/');
      }
    }
  );
});

app.listen(3000);