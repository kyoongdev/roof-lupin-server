docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker volume prune
sleep 5
docker-compose  -f docker-compose.db.yml up -d

sleep 12

bash docker/db/setup_db.sh