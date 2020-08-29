import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WinnerDto } from './winning.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Winning } from './winning.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Controller('winning')
@ApiTags('中奖模块')
export class WinningController {

    constructor(
        @InjectModel(Winning) private readonly model: ModelType<Winning>
    ) { }

    /**
     * 创建中奖者
     */
    @Post()
    @ApiOperation({ summary: '创建中奖信息' })
    async createWinner(@Body() Winner: WinnerDto) {
        return this.model.create(Winner)
    }
}
