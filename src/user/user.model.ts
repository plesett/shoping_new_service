import { prop, modelOptions } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { hashSync } from 'bcryptjs'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @ApiProperty({ description: '用户头像' })
    @prop({
        default: 'http://b-ssl.duitang.com/uploads/item/201507/17/20150717174827_CwQdt.thumb.700_0.jpeg'
    })
    avatars?: string

    @IsNotEmpty({ message: '请填写用户手机' })
    @ApiProperty({ description: '用户手机' })
    @prop({
        required: true
    })
    mobile: number

    @IsNotEmpty({ message: '请填写用户密码' })
    @ApiProperty({ description: '用户密码' })
    @prop({
        required: true,
        select: false,
        set(value) {
          return value ? hashSync(value) : value // 只能返回字符串
        },
        get(value) {
          return value
        }
    })
    password: string

    @IsNotEmpty({ message: '请填写支付密码字段' })
    @ApiProperty({ description: '用户支付密码' })
    @prop({
        select: false,
        set(value) {
          return value ? hashSync(value) : value // 只能返回字符串
        },
        get(value) {
          return value
        }
    })
    pay_pass?: string // 支付密码实际是数字，经过加密为字符串 默认为登录密码

    @ApiProperty({ description: '用户昵称' })
    @prop({
        default: '系统默认用户名' + Math.round(Math.random() * 10000)
    })
    nickname?: string

    @ApiProperty({ description: '用户余额' })
    @prop({
        default: 0
    })
    balance?: number

    @IsEnum([0, 1])
    @ApiProperty({ description: '用户状态' })
    @prop({
        enum: [0, 1],
        default: 0
    })
    state?: number

    @ApiProperty({ description: '用户收货地址' })
    @prop({
        default: ''
    })
    address?: string

    @IsNotEmpty({ message: '请填写城市字段' })
    @ApiProperty({ description: '用户城市' })
    @prop({
        default: '北京'
    })
    city?: string

    @IsEnum([0, 1])
    @ApiProperty({ description: '用户是否为vip' })
    @prop({
        enum: [ 0, 1 ],
        default: 0
    })
    vip?: number

    @IsEnum([0, 1])
    @ApiProperty({ description: '用户是否消息已经推送' })
    @prop({
        enum: [0, 1],
        default: 0 // 0 -> 未推送  1 -> 已推送
    })
    message?: number

    @IsNotEmpty({ message: '请填写ip字段' })
    @ApiProperty({ description: '用户登录ip' })
    @prop()
    login_ip?: string
}