import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { InformationController } from './information.controller';
import { Information } from './information.model';

@Module({
    imports: [
        TypegooseModule.forFeature([Information])
    ],
    controllers: [ InformationController ]
})
export class InformationModule {}
