import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Message } from './message.model';
import { MessageController } from './message.controller';

@Module({
    imports: [
        TypegooseModule.forFeature([Message])
    ],
    controllers: [MessageController]
})
export class MessageModule { }
