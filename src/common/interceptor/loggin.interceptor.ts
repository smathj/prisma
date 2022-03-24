import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const logger = new Logger('InterCeptor');
    logger.log(`request.url = ${request.url}`);
    logger.log(`request.method = ${request.method}`);

    const now = Date.now();
    return next.handle().pipe(
      map((result) => ({
        // success: true,
        result,
      })),
    );
    // .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
