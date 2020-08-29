import { Controller, Post, Body, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Information } from './information.model';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('information')
@ApiTags('参与的用户信息表')
export class InformationController {

    constructor(
        @InjectModel(Information)  private readonly model:ModelType<Information>
    ) {}

    @Get()
    @ApiOperation({ summary: '参与用户信息' })
    async createInformation() {
        return await this.model.find()
    }
}
