import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Ongoing } from './ongoing.model';
import { InjectModel } from 'nestjs-typegoose';
import { OngoingDto } from './ongoing.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.model';
import { Information } from '../information/information.model';
import { ToolFNService } from '../tool.service';
import { Nper } from './nper.model';
import { Product } from '../product/product.model';

@Controller('ongoing')
@ApiTags('商品正在参与模块')
export class OngoingController {

    _nper_count = null
    _product_id = null
    _count = null

    constructor(
        @InjectModel(Ongoing) private readonly model: ModelType<Ongoing>,
        @InjectModel(User) private readonly modelUser: ModelType<User>,
        @InjectModel(Information) private readonly modelInformation: ModelType<Information>,
        @InjectModel(Nper) private readonly modelNper: ModelType<Nper>,
        @InjectModel(Product) private readonly modelProduct: ModelType<Product>,
        private ToolFNService: ToolFNService
    ) { }


    /**
     * 创建商品正在参与者
     */
    @Post()
    @ApiOperation({ summary: '创建参与信息' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async createWinner(@Body() Ongoing: OngoingDto, @Req() req) {
        // 判断count是否为非法
        if (Number(Ongoing.count) === 0) {
            return { msg: 'count非法参数', code: -1 }
        }
        // 找出期数
        let nper_count = await this.modelNper.findOne({ product_id: Ongoing.product_id })
        if (nper_count === null) {
            // 初始化期数
            let new_nper_count = await this.modelNper.create({ nper_count: 1, product_id: Ongoing.product_id })
            this._nper_count = new_nper_count.nper_count
            this._product_id = new_nper_count.product_id
        } else {
            this._nper_count = nper_count.nper_count 
            this._product_id = nper_count.product_id
        }
        // 找出participants为空则第一次参与 反之 则修改增加字段// 判断期数是否过期
        let selectRes = await this.model.find({ product_id: Ongoing.product_id, state: true, according: this._nper_count })
        if (selectRes.length === 0) {
            // 没有则新建一期数
            let new_nper_count = await this.modelNper.create({ nper_count: this._nper_count, product_id: Ongoing.product_id })
            this._nper_count = new_nper_count.nper_count
            this._product_id = new_nper_count.product_id
        }
        let ArrayCount = [];
        let resUser = await this.modelUser.find({ _id: req.user._id, state: 0 }, { balance: 0, state: 0, vip: 0, message: 0, mobile: 0, login_ip: 0, address: 0 })
        for (let i = 0; i < Ongoing.count; i++) {
            ArrayCount.push(this.ToolFNService.randomCount())
        }
        let resInformation = await this.modelInformation.create({
            avatars: resUser[0].avatars,
            nickname: resUser[0].nickname,
            city: resUser[0].city,
            count: Ongoing.count,
            participate_count: ArrayCount,
            user_id: resUser[0]._id
        })
        // 判断商品id是否存在
        if (selectRes.length !== 0) {
            // 增加
            let par = selectRes[0].participants
            let newArray = []
            for (let i = 0; i < par.length + 1; i++) {
                if (i < par.length) {
                    newArray[i] = par[i]
                } else {
                    newArray[i] = resInformation._id
                }
            }
            let res = await this.model.findByIdAndUpdate(selectRes[0]._id, Object.assign(Ongoing, { participants: newArray, according: this._nper_count })) //最终该商品参与人集合
            resInformation._id = res.participants
            // 更新商品参与人数
            let res_pro = await this.modelProduct.findById(Ongoing.product_id)
            await this.modelProduct.findByIdAndUpdate(Ongoing.product_id,{ already_participation: res_pro.already_participation + Ongoing.count})
            return { msg: `用户${req.user.nickname}参与成功`, code: 0 }
        } else {
            // console.log(this._nper_count)
            let resOngoing = await this.model.find({ product_id: Ongoing.product_id, state: true })
            // console.log(resOngoing)
            if (resOngoing.length === 0) {
                let nper_count_new = await this.modelNper.findOne({ product_id: Ongoing.product_id })
                await this.modelNper.findByIdAndUpdate(nper_count_new._id, { nper_count: this._nper_count + 1 })
                this._nper_count = this._nper_count + 1
                console.log('准备新建一期')
            }
            this._count = Ongoing.count
            // 删除 key -> count
            delete Ongoing.count
            //最终该商品参与人集合
            let res = await this.model.create(Object.assign(Ongoing, { participants: [String(resInformation._id)], according: this._nper_count }))
            // 进行关联操作
            resInformation._id = res.participants
            console.log(Ongoing, '---------Ongoing------')
            // 更新商品参与人数
            let res_pro = await this.modelProduct.findById(Ongoing.product_id)
            console.log(res_pro.already_participation + Ongoing.count, '******')
            console.log(res_pro.already_participation, Ongoing.count, '******')
            console.log(Ongoing ,'/////////////////')
            await this.modelProduct.findByIdAndUpdate(Ongoing.product_id,{ already_participation: res_pro.already_participation + this._count})
            return { msg: `用户${req.user.nickname}第一人次参与成功`, code: 0 }
        }
    }
}
