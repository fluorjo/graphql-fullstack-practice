- mysql
  - docker run -d -e MYSQL_ROOT_PASSWORD=qwer1234 --name mysql-container -p 3306:3306 mysql
  - docker exec -it mysql-container /bin/bash
  - mysql -u root -pshoq 
  - SHOW DATABASES;
  - create database ghibli_graphql
  
- redis
  - docker pull redis:6.2
  - docker run -d --name redis-container -p 6379:6379 redis:6.2
  - docker network create redis-network
  - docker network connect redis-network redis-container 
  - docker run -it --network redis-network --rm redis redis-cli -h redis-container

  - docker exec -it redis-container /bin/bash
  - redis-cli