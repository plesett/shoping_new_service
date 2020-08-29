import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Product } from './product.model';
import { ProductController } from './product.controller';
import { Winning } from '../winning/winning.model';
import { Ongoing } from '../ongoing/ongoing.model';

@Module({
    imports: [
        TypegooseModule.forFeature([Product, Winning, Ongoing])
    ],
    controllers: [ProductController]
})
export class ProductModule { }
