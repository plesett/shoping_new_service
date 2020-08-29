import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from './user.controller';
import { User } from './user.model';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { LocalStrategyPay } from '../auth/pay.strategy';

@Module({
    imports: [
        TypegooseModule.forFeature([User]),
        PassportModule
    ],
    controllers: [UserController],
    providers: [
        LocalStrategy,
        LocalStrategyPay,
        JwtStrategy
    ]
})
export class UserModule { }
