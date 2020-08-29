import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { User } from '../user/user.model';


export class LocalStrategyPay extends PassportStrategy(Strategy, 'pay') {
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ){
        super({
            usernameField: '_id',
            passwordField: 'pay_pass'
        } as IStrategyOptions)
    }

    async validate(_id: string, pay_pass: string) {
        const user = await this.userModel.findById(_id).select('+pay_pass')
        if (!user) {
            throw new BadRequestException('用户名不正确')
        }
        if (!compareSync(pay_pass, user.pay_pass)) {
            throw new BadRequestException('支付密码错误')
        }
        return user;
    }
}