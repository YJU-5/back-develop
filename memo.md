# Tue Nov 5 16:08:39 KST 2024 
-   TypeOrmModule을 app.module에 설정을 해 주었으면 그걸 사용하는 모듈에도 엔티티를 설정해주어야 한다 
-   그리고 Repository를 사용하려면 인젝트를 해주어야함 
-   DTO를 사용할 때 먼저 유효성 검사를 해주지 않으면 request에서 DTO에서 차단해버림 
-   [Nest] 10352  - 2024. 11. 05. 오후 5:36:43   ERROR [ExceptionHandler] Nest can't resolve dependencies of the UserService (UserRepository, ?). Please make sure that the argument dependency at index [1] is available in the UserModule context.
- 이 에러가 떴을 때 상호의존은 잘 되어있는지 안해주었는지 쓸데없이 service가 서로 상호의존되지는 않았는지 잘 보기 

# 기존 이미지 URL
-   기존에 있던 이미지만(url)
-   기존에 있던 이미지(url) + 새로운 이미지(파일) 
-   기존에 있던 이미지 삭제(url), 새로운 이미지(파일)
    -    
-   사진없이 텍스트만 

# 기존의 이미지 = 기본적으로 upload하지 않음, DTO 중복된게 문제고 프론트도 약간 고치고 전제가 files를 받는게 전제가 될 수 밖에 없음 