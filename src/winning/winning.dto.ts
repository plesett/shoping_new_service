import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"


export class WinnerDto {
    @ApiProperty({ description: '商品期数' })
    @IsNotEmpty({ message: '请填写期数' })
    product_id: string

    @ApiProperty({ description: '商品期数' })
    @IsNotEmpty({ message: '请填写期数' })
    nper: number

    @ApiProperty({ description: '商品标题' })
    @IsNotEmpty({ message: '请填写标题' })
    winning_user_id: string
}