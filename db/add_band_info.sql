INSERT INTO band_info (band_picture, band_name, band_description, genre, band_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- this next statement joins band_users & band_info
-- SELECT bu.username, bi.*
-- FROM band_users bu
-- INNER JOIN band_info bi ON bu.id=bi.band_id;