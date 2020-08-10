use dblec;
insert into games (year,season,date,which_num,player_id,rank_num,point) values("2019","regular","10-08",1,4,4,-706);
insert into games (year,season,date,which_num,player_id,rank_num,point) values("2019","regular","10-29",1,8,1,527);
insert into games (year,season,date,which_num,player_id,rank_num,point) values("2019","regular","10-29",2,18,3,-325);
insert into games (year,season,date,which_num,player_id,rank_num,point) values("2019","regular","10-28",1,13,4,-528);
insert into games (year,season,date,which_num,player_id,rank_num,point) values("2019","regular","10-28",1,12,2,90);
insert into games (year,season,date,which_num,player_id,rank_num,point) values("2019","regular","10-25",1,14,1,642);
insert into games (year,season,date,which_num,player_id,rank_num,point) values("2019","regular","11-01",2,25,1,641);
insert into games (year,season,date,which_num,player_id,rank_num,point) values("2019","regular","11-05",2,29,3,-160);

select players.last_name,games.year,games.date,games.which_num,games.rank_num,games.point from players join games on games.player_id = players.id;