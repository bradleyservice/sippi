SELECT * FROM band_shows bs
WHERE LOWER(bs.title) LIKE LOWER('%' || $1 || '%');