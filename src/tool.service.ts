import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolFNService {

    randomAccess() {
        return  Math.round(Math.random() * 10000)
    }

    randomCount() {
        return  1000 + Math.round(Math.random() * 100000000)
    }

}