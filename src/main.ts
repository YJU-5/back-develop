import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();  // .env 파일을 로드하여 환경 변수 사용 가능하게 만듦


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('메인 API')
    .setDescription('메인 API 문서')
    .setVersion('1.0')
    .addTag('main', '메인 API')
    // jwt 토큰인증헤더에 넣어줄 때
    .addBearerAuth() // 컨트롤러에 ApiBeareAuth()이걸 하면 인증하면 됨
    .setTermsOfService(
      'https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-HTTP-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%A2%85%EB%A5%98-%ED%86%B5%EC%8B%A0-%EA%B3%BC%EC%A0%95-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC',
    )
    // 서버도 추가 됨 즉, 실제 테스트 용도, 배포 용도
    // .addServer('http://localhost:3002', 'develop')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  //Cors
  app.enableCors();

  // 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 아무 decorator도 없는 어떠한 property의 object를 거릅니다
      forbidNonWhitelisted: true, // 아예 차단
      transform: true, // 클라이언트에서 보낸 데이터를 원하는 타입으로 변경
      // EX) url 값은 보통 string인데 이걸 설정해주고 타입을 number로 하면 자동으로 바꿈
    }),
  ); // middleware 같은 것
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
