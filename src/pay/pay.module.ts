import { Module } from '@nestjs/common';
import { PayController } from './pay.controller';
import { User } from '../user/user.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
    imports: [
        TypegooseModule.forFeature([User])
    ],
    controllers: [PayController]
})
export class PayModule {}
