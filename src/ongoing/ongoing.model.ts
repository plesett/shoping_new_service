import { prop, modelOptions, arrayProp } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { Schema } from "mongoose";
import { Information } from "src/information/information.model";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Ongoing {
    @ApiProperty({ description: '商品当前参与的期数' })
    @IsNotEmpty({ message: '请填写商品当前参与的期数' })
    @prop()
    according?: number

    @ApiProperty({ description: '商品本期参与者' })
    @IsNotEmpty({ message: '请填写商品本期参与者' })
    @arrayProp({
        ref: Information
    })
    participants?: Array<Schema.Types.ObjectId>;

    @ApiProperty({ description: '商品参与次数' })
    @IsNotEmpty({ message: '请填写参与次数' })
    @prop()
    count?: number

    @ApiProperty({ description: '商品id' })
    @IsNotEmpty({ message: '请填写id' })
    @prop({
        required: true
    })
    product_id: string

    @ApiProperty({ description: '当前参与是否过期' })
    @prop({
        default: true
    })
    state?: boolean
}