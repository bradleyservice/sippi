SELECT f.*, bu.username, bu.profile_pic FROM forums f
INNER JOIN band_users bu ON f.band_id=bu.id
ORDER BY f.id DESC;