import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// * 의존성 주입이 가능한 상태
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Global_Logger');

  use(req: Request, res: Response, next: NextFunction) {
    // * 응답할때 이벤트걸어서 사용하기
    res.on('finish', () => {
      this.logger.log(
        `${req.ip}, ${req.method}, ${res.statusCode}, ${req.originalUrl}`,
      );
    });
    next();
  }
}
