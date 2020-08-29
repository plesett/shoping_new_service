import { prop, modelOptions, arrayProp } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Product {
    @ApiProperty({ description: '商品标题' })
    @IsNotEmpty({ message: '请填写标题' }) // 不为空处理
    @prop({
        required: true
    })
    title: string

    @ApiProperty({ description: '商品价格' })
    @prop({
        default: 100
    })
    price: number

    @ApiProperty({ description: '商品展示图片' })
    @IsNotEmpty({ message: '请填写商品展示图片' })
    @prop({
        required: true
    })
    picture: string

    @ApiProperty({ description: '商品轮播图片', example: ["string", "string"] })
    @IsNotEmpty({ message: '请填写商品轮播图片' })
    @prop({
        required: true
    })
    picture_banner: Array<string>

    @ApiProperty({ description: '商品详情图片' })
    @IsNotEmpty({ message: '请填写商品详情图片' })
    @prop({
        required: true
    })
    picture_info: Array<string>

    @ApiProperty({ description: '商品分类' })
    @prop()
    classify: number

    @ApiProperty({ description: '该商品总需参与人数' })
    @prop({
        default: 200
    })
    total_participation: number

    @ApiProperty({ description: '该商品已经需参与人数' })
    @prop({
        default: 0
    })
    already_participation?: number

    @ApiProperty({ description: '商品是否为新品 0 -> 正常， 1 -> 新品' })
    @prop()
    new: number

    @ApiProperty({ description: '商品状态 0 -> 正常， 1 -> 关闭' })
    @prop()
    state: number
}