UPDATE forums SET
title = $1,
img = $2,
content = $3
WHERE id = $4;