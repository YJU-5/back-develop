# Tue Nov 5 16:08:39 KST 2024 
-   TypeOrmModule을 app.module에 설정을 해 주었으면 그걸 사용하는 모듈에도 엔티티를 설정해주어야 한다 
-   그리고 Repository를 사용하려면 인젝트를 해주어야함 
-   DTO를 사용할 때 먼저 유효성 검사를 해주지 않으면 request에서 DTO에서 차단해버림 
-   [Nest] 10352  - 2024. 11. 05. 오후 5:36:43   ERROR [ExceptionHandler] Nest can't resolve dependencies of the UserService (UserRepository, ?). Please make sure that the argument dependency at index [1] is available in the UserModule context.
- 이 에러가 떴을 때 상호의존은 잘 되어있는지 안해주었는지 쓸데없이 service가 서로 상호의존되지는 않았는지 잘 보기 


# ###### Mon Dec 9 20:53:23 KST 2024 
# 로그인한 사람 항목 넣어주기 
manyToOne oneToMany 는 manyToOne은 userId를 생성함 oneToMany는 기본 배열로 받으니까 배열객체로 보내주어야 함 즉, userId로 찾아서 그 결과를보내주어야 한다는 것임 원리알아보기##