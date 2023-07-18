docker-compose  -f docker-compose.db.yml up -d

sleep 10

bash docker/db/setup_db.sh