SELECT bs.*, bu.username, bu.profile_pic FROM band_shows bs
INNER JOIN band_users bu ON bs.band_id=bu.id
ORDER BY bs.id DESC;