SELECT bu.profile_pic, bs.*
FROM band_users bu
INNER JOIN band_shows bs ON bu.id=bs.band_id;
-- WHERE bu.id & bs.band_id = $1
-- ORDER BY id DESC;