import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class OngoingDto {

    @ApiProperty({ description: '商品参与次数' })
    @IsNotEmpty({ message: '请填写参与次数' })
    count: number

    @ApiProperty({ description: '商品id' })
    @IsNotEmpty({ message: '请填写id' })
    product_id: string
}