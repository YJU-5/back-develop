- docker exec -it <mysql-container-name> mysql -u <username> -p

- docker exec -it my_mysql mysql -u root -p

도커 migration 실행 
docker exec -it 5project-backend-1 npm run migration:run -- --dataSource ./src/data-source.ts  

마이그레이션 만들기 
npm run typeorm migration:generate -- -d ./src/data-source.ts -p ./src/path-to-migrations-dir/Newmigrations

마이그레이션 실행 
npm run typeorm migration:run -- -d ./src/data-source.ts

git bash에서 mysql 백업 
mysqldump -u root -p project_5team > backup.sql

백업 파일 적용 
mysql -u root -p project_5team < backup.sql

// migration 문제였던 것들
- 마이그레이션은 엔티티를 고치면 그걸 바로 반영할 수 있게끔 query를 사용해서 조정해줌
  - 이미 엔티티와 같은값은 적용안함  
- 데이터 소스안에 마이그레이션 경로가 제대로 안됬었음 __dirname을 하면 절대경로로 고칠 수 있음 
- 무슨 타입 문제가 있었는데 tsconfig.ts에 가면 있음 
- npm 명령어가 잘못됬었음 
- 도커에서 실행하는지 로컬에서 실행하는지 잘 보셈