CREATE TABLE band_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    username VARCHAR(200),
    password VARCHAR(200),
    profile_pic VARCHAR(1000)
);

CREATE TABLE band_shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250),
    img VARCHAR(1000),
    content VARCHAR(2000),
    band_id INT REFERENCES band_users(id)
);

CREATE TABLE band_info (
    id SERIAL PRIMARY KEY,
    band_picture VARCHAR(1000),
    band_name VARCHAR(300),
    band_description VARCHAR(2000),
    genre VARCHAR(200),
    band_id INT REFERENCES band_users(id)
);

CREATE TABLE forums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300),
    img VARCHAR(1000),
    content VARCHAR(3000),
    band_id INT REFERENCES band_users(id)
);