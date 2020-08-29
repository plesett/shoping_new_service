import { IsMobilePhone, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class ProductCreateDto {
    @IsNotEmpty({ message: '请填写商品标题字段' })
    @ApiProperty({ description: '商品标题' })
    title: string

    @IsNotEmpty({ message: '请填写商品价格字段' })
    @ApiProperty({ description: '商品价格' })
    price: number

    @IsNotEmpty({ message: '请填写商品展示图片字段' })
    @ApiProperty({ description: '商品展示图片' })
    picture: string

    @IsNotEmpty({ message: '请填写商品展示轮播图图片字段' })
    @ApiProperty({ description: '商品展示轮播图图片' })
    picture_banner: Array<string>

    @IsNotEmpty({ message: '请填写商品展示详情图片字段' })
    @ApiProperty({ description: '商品展示详情图片' })
    picture_info: Array<string>

    @IsNotEmpty({ message: '请填写商品展示分类字段' })
    @ApiProperty({ description: '商品展示分类' })
    classify: number

    @IsNotEmpty({ message: '请填写商品总参与字段' })
    @ApiProperty({ description: '商品总参与' })
    total_participation: number

    @IsEnum([0, 1])
    @IsNotEmpty({ message: '请填写商品是否为新品字段' })
    @ApiProperty({ description: '商品是否为新品' })
    new: number

    @IsEnum([0, 1])
    @IsNotEmpty({ message: '请填写商品状态字段' })
    @ApiProperty({ description: '商品状态' })
    state: number
}

export class ProductUpdateDto {
    @IsNotEmpty({ message: '请填写商品标题字段' })
    @ApiProperty({ description: '商品标题' })
    title?: string

    @IsNotEmpty({ message: '请填写商品价格字段' })
    @ApiProperty({ description: '商品价格' })
    price?: number

    @IsNotEmpty({ message: '请填写商品展示图片字段' })
    @ApiProperty({ description: '商品展示图片' })
    picture?: string

    @IsNotEmpty({ message: '请填写商品展示轮播图图片字段' })
    @ApiProperty({ description: '商品展示轮播图图片' })
    picture_banner?: Array<string>

    @IsNotEmpty({ message: '请填写商品展示详情图片字段' })
    @ApiProperty({ description: '商品展示详情图片' })
    picture_info?: Array<string>

    @IsNotEmpty({ message: '请填写商品展示分类字段' })
    @ApiProperty({ description: '商品展示分类' })
    classify?: number

    @IsNotEmpty({ message: '请填写商品总参与字段' })
    @ApiProperty({ description: '商品总参与' })
    total_participation?: number

    @IsEnum([0, 1])
    @IsNotEmpty({ message: '请填写商品是否为新品字段' })
    @ApiProperty({ description: '商品是否为新品' })
    new?: number

    @IsEnum([0, 1])
    @IsNotEmpty({ message: '请填写商品状态字段' })
    @ApiProperty({ description: '商品状态' })
    state?: number
}