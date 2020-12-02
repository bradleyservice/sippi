UPDATE band_users SET
profile_pic = $2
WHERE id = $1;

SELECT * FROM band_users
WHERE id = $1;