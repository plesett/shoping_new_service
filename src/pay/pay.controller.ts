import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User } from '../user/user.model';
import { IsNotEmpty } from 'class-validator';
import { OngoingController } from '../ongoing/ongoing.controller';

class Passdto {
    @IsNotEmpty({ message: '请填写_id字段' })
    // @IsMobilePhone('zh-CN')
    @ApiProperty({ description: '用户_id' })
    _id: string

    @ApiProperty({ description: '用户支付密码' })
    @IsNotEmpty({ message: '请填写支付密码字段' })
    pay_pass: string

    @ApiProperty({ description: '用户购买金额' })
    @IsNotEmpty({ message: '请填写购买金额字段' })
    count: number
}

@Controller('pay')
@ApiTags('支付模块')
export class PayController {

    constructor(
        @InjectModel(User) private readonly modelUser: ModelType<User>
    ) { }

    @Post('pay_pass')
    @UseGuards(AuthGuard(['pay', 'jwt']))
    @ApiBearerAuth()
    @ApiOperation({ summary: '支付密码校验接口' })
    async AuthPayPass(@Body() pay_pass_info: Passdto, @Req() req) {
        // req.user_id
        // 首先判断是否存在该用户，并且为正常用户
        if (!req.user._id) return { msg: '非法支付', code: -1 }
        // 判断当前用户支付金额是否足够
        console.log('通过')
        // 判断
        if (Number(req.user.balance) - Number(pay_pass_info.count) < 0) return { msg: '余额不足,支付失败', code: 0 }
        // 开始扣除金额
        await this.modelUser.findByIdAndUpdate(req.user._id, { balance: req.user.balance - pay_pass_info.count })
        return {msg: '支付成功', code: 0}
    }
}
