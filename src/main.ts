import { ValidationPipe } from '@nestjs/common';
import { APP_FILTER, NestFactory } from '@nestjs/core';
// import * as session from 'express-session';
// import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  // 
  // app.use(
    // session({
      // secret: process.env.SECRET,
      // resave: false,
      // saveUninitialized: false,
      // cookie: {maxAge: 3600000}
    // })
  // );
// 
  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(cookieParser())
  app.enableCors({credentials: true, origin: process.env.CLIENT_URL});
  await app.listen(3000);
}
bootstrap();
