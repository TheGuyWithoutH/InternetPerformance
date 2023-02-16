# Start mongo docker
sudo docker run -p 27017:27017 -v /home/calvarez/public_mongo:/data/db -d mongo

# Start redis docker
sudo docker run -p 6479:6379 -d redis