import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    throw new HttpException('权限失效', HttpStatus.FORBIDDEN);
  }
}
