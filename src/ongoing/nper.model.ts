import { prop, modelOptions } from "@typegoose/typegoose";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Nper {
    @ApiProperty({ description: '商品当前参与的期数' })
    @IsNotEmpty({ message: '请填写商品当前参与的期数' })
    @prop({
        required: true
    })
    nper_count: number

    @ApiProperty({ description: '商品id' })
    @IsNotEmpty({ message: '请填写商品id' })
    @prop({
        required: true
    })
    product_id: string
}