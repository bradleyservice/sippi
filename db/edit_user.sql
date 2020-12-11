UPDATE band_users SET
username = $3,
profile_pic = $2
WHERE id = $1;

SELECT * FROM band_users
WHERE id = $1;