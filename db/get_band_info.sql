SELECT bu.username, bu.profile_pic, bi.*
FROM band_users bu
INNER JOIN band_info bi ON bu.id=bi.band_id
WHERE bu.id & bi.band_id = $1
ORDER BY id DESC;