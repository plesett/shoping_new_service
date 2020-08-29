import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { OngoingController } from './ongoing.controller';
import { Ongoing } from './ongoing.model';
import { User } from '../user/user.model';
import { Information } from '../information/information.model';
import { Nper } from './nper.model';
import { Product } from '../product/product.model';

@Module({
    imports: [
        TypegooseModule.forFeature([Ongoing, Nper, User, Information, Product])
    ],
    controllers: [OngoingController]
})
export class OngoingModule { }
