import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from 'http-exception.filter';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptor/loggin.interceptor';
import { PrismaService } from './prismae.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //
  app.useGlobalInterceptors(new LoggingInterceptor());
  //
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  //
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
