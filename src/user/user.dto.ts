import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsMobilePhone, IsIP } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: '请填写手机' })
    @IsMobilePhone('zh-CN')
	@ApiProperty({ description: '用户账号', example: '18226764519' })
    mobile:string;

    @IsNotEmpty({ message: '请填写密码' })
	@ApiProperty({ description: '用户密码', example: '123123' })
	password: string;
}


export class UserCreateDto {
    @IsNotEmpty({ message: '请填写手机字段' })
    // @IsMobilePhone('zh-CN')
    @ApiProperty({ description: '用户手机' })
    mobile: string

    @ApiProperty({ description: '用户登录密码' })
    @IsNotEmpty({ message: '请填写密码字段' })
    password: string

    // @ApiProperty({ description: '用户登录城市' })
    // @IsNotEmpty({ message: '请填写城市字段' })
    // city: string

    // @ApiProperty({ description: '用户登录IP' })
    // @IsNotEmpty({ message: '请填写IP字段' })
    // @IsIP(4)
    // login_ip: string
}

export class UserUpdateDto {
    @ApiProperty({ description: '用户头像' })
    avatars?: string

    @ApiProperty({ description: '用户登录昵称' })
    nickname?: string

    @ApiProperty({ description: '用户收货地址' })
    address?: string

    @ApiProperty({ description: '用户所在城市' })
    city?: string

    @IsIP(4)
    @ApiProperty({ description: '用户登录IP' })
    login_ip?: string
}

export class ImportantUserDto {

    @ApiProperty({ description: '用户登录密码' })
    password: string

    @ApiProperty({ description: '用户支付密码' })
    pay_pass: string
}