import { prop, modelOptions } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Winning {
    @ApiProperty({ description: '商品id' })
    @IsNotEmpty({ message: '请填写id' })
    @prop({
        required: true
    })
    product_id: string

    @ApiProperty({ description: '商品期数' })
    @IsNotEmpty({ message: '请填写期数' })
    @prop({
        required: true
    })
    nper: number

    @ApiProperty({ description: '商品标题' })
    @IsNotEmpty({ message: '请填写标题' }) 
    @prop({
        required: true
    })
    winning_user_id: string
}