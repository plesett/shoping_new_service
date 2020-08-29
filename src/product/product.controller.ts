import { Controller, Get, Put, Post, Delete, Query, Param, Body } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Product } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { classifyDictionary } from 'config/classify';
import { ProductCreateDto, ProductUpdateDto } from './product.dto';
import { Winning } from '../winning/winning.model';
import { Ongoing } from '../ongoing/ongoing.model';

@ApiTags('商品模块接口')
@Controller('product')
export class ProductController {

    constructor(
        @InjectModel(Product) private readonly model: ModelType<Product>,
        @InjectModel(Winning) private readonly modelWinning: ModelType<Winning>,
        @InjectModel(Ongoing) private readonly modelOngoing: ModelType<Ongoing>
    ) { }

    /**
     * ---------------------------------以下接口仅供前台使用-----------------------------
     * 
     */

    /**
     * 获取商品
     * @param: pageIndex: number 当前页数
     * @param: pageSize：number 数量
     */
    @Get()
    @ApiOperation({ summary: '获取商品列表' })
    async GetProductInfo(@Query('pageIndex') pageIndex: number) {
        const pageSize = 10;
        return await this.model.find({ state: 0 }, { picture_banner: 0, picture_info: 0 }).skip((pageIndex - 1) * pageSize).limit(pageSize)
    }

    /**
     * 获取商品基本信息
     * [id,...]
     */
    @Post('basics')
    @ApiOperation({ summary: '获取商品基本信息' })
    async GetProductBasicsInfo(@Body() ArrayDto: Array<string>) {
        let ArrayPro = []
        for (let i = 0; i < ArrayDto.length; i++) {
            const element = ArrayDto[i];
            let res = await this.model.findById(element, { picture_banner: 0, picture_info: 0 })
            ArrayPro.push(res)
        }
        return ArrayPro
    }

    /**
     * 获取所有商品 分类信息    
     */
    @Get('/classify')
    @ApiOperation({ summary: '获取所有分类商品信息' })
    async GetAllclassifyProductInfo() {
        let ArrayInfo = []
        for (let i = 0; i < classifyDictionary.length; i++) {
            const item = classifyDictionary[i];
            let res = await this.model.find({ state: 0, classify: item.code }, { picture_banner: 0, picture_info: 0 })
            ArrayInfo.push({ name: item.name, data: res, id: i })
        }
        return ArrayInfo
    }

    /**
     * 好物推荐
     */
    @Get('/thing')
    @ApiOperation({ summary: '获取所有好物商品信息' })
    async GetThingInfo() {
        return await this.model.find({ state: 0, new: 1 }, { picture_banner: 0, picture_info: 0 })
    }

    /**
     * 查询某商品详情
     */
    @Get(':id')
    @ApiOperation({ summary: '查询某商品' })
    async GetOneProductInfo(@Param('id') id: string) {
        let WinnerArray = await this.modelWinning.find({ product_id: id })
        let OngoingArray = await this.modelOngoing.find({ product_id: id, state: true }).populate('participants') // 关联查询出用户
        // let OngoingArray = await this.modelOngoing.aggregate([
        //     {
        //         $lookup:
        //           {
        //             from: "information",
        //             localField: "participants",
        //             foreignField: "_id",
        //             as: "participants_docs"
        //           }
        //      },
        //      { $match : {"participants_docs" : [ ]} }
        // ])
        let productArray = await this.model.findById(id)
        // console.log(OngoingArray)
        return { winner: OngoingArray, history: WinnerArray, data: productArray } // 这里缺少正在参与者
    }

    /**
     * ---------------------------------以下接口仅供后台使用-----------------------------
     * 
     */

    /**
     * 分页查询商品 
     * pageIndex: number 当前页面索引
     * pageSize： number 当前页面数据量
     */
    @Get('backstage/admin')
    @ApiOperation({ summary: '分页查询商品' })
    async GetProductInfoPageSize(@Query('pageIndex') pageIndex: number, @Query('pageSize') pageSize: number) {
        return {
            totol: await this.model.find().countDocuments(),
            data: await this.model.find({}, { picture_banner: 0, picture_info: 0 }).skip(pageIndex * pageSize).limit(Number(pageSize)),
            pageIndex: pageIndex,
        }
    }

    /**
     * 
     * 创建商品
     */
    @Post()
    @ApiOperation({ summary: '创建商品' })
    async CreateProductInfo(@Body() createDto: ProductCreateDto) {
        return await this.model.create(createDto)
    }

    /**
     * 更新商品
     */
    @Put(':id')
    @ApiOperation({ summary: '更新商品' })
    async UpdateProductInfo(@Param('id') id: string, @Body() ProductUpdate: ProductUpdateDto) {
        await this.model.findByIdAndUpdate(id, ProductUpdate)
        return { msg: '更新成功', code: 0 }
    }

    /**
     * 删除商品
     */
    @Delete(':id')
    @ApiOperation({ summary: '删除商品' })
    async DeleteProductInfo(@Param('id') id: string) {
        await this.model.findByIdAndDelete(id)
        return { msg: '删除成功', code: 0 }
    }
}
