import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Winning } from './winning.model';
import { WinningController } from './winning.controller';

@Module({
    imports: [
        TypegooseModule.forFeature([Winning])
    ],
    controllers: [WinningController]
})
export class WinningModule { }
