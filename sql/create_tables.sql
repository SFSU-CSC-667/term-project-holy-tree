CREATE TABLE games (
	id SERIAL,
	created_at date,
	finished boolean
);

CREATE TABLE users (
	id SERIAL,
	name VARCHAR,
	profile_pic VARCHAR,
	uid VARCHAR,
	rank integer,
	created_at date
);

CREATE TABLE user_game (
	id SERIAL,
	user_id integer,
	game_id integer,
	role VARCHAR,
	nightaction_target integer,
	item VARCHAR,
	vote integer
);
