import { modelOptions, prop } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Information {

    @ApiProperty({ description: '用户头像' })
    @prop()
    avatars: string

    @ApiProperty({ description: '用户昵称' })
    @prop()
    nickname: string

    @IsNotEmpty({ message: '请填写城市字段' })
    @ApiProperty({ description: '用户城市' })
    @prop({
        required: true
    })
    city: string

    @IsNotEmpty({ message: '请填写参与此次数字段' })
    @ApiProperty({ description: '用户参与此次数' })
    @prop({
        required: true
    })
    count: number

    @IsNotEmpty({ message: '请填写参与所有号码字段' })
    @ApiProperty({ description: '用户参与所有号码' })
    @prop({
        required: true
    })
    participate_count: Array<number>

    @IsNotEmpty({ message: '请填用户id' })
    @ApiProperty({ description: '用户id' })
    @prop({
        required: true
    })
    user_id: string
}