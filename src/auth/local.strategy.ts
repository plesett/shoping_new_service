import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { User } from '../user/user.model';


export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ){
        super({
            usernameField: 'mobile',
            passwordField: 'password'
        } as IStrategyOptions)
    }

    async validate(mobile: string, password: string) {
        const user = await this.userModel.findOne({ mobile: Number(mobile) }).select('+password')
        if (!user) {
            throw new BadRequestException('用户名不正确')
        }
        if (!compareSync(password, user.password)) {
            throw new BadRequestException('密码错误')
        }
        return user;
    }
}