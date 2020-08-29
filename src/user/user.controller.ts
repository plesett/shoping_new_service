import { Controller, Get, Post, Put, Param, Body, Query, Delete, UseGuards, Req } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { User } from './user.model';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserCreateDto, UserUpdateDto, ImportantUserDto, LoginDto } from './user.dto';
import { CacheService } from '../cache.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { TenXunMap } from '../../config/index';
const random = require('string-random');
const koaReq = require('request')

@Controller('user')
@ApiTags('用户模块')
export class UserController {

    _city = ''
    _userIP = null

    constructor(
        @InjectModel(User) private readonly model: ModelType<User>,
        private readonly CacheService: CacheService,
        private JwtService: JwtService
    ) { }

    @ApiOperation({ summary: '获取所有用户信息  测试阶段 生成模式剔除' })
    @Get()
    async index() {
        return await this.model.find()
    }

    /**
     * -----------------------------以下接口暴露为前台使用-----------------------------
     * 
     */


    /**
     * 用户登录
     */
    @ApiOperation({ summary: '用户登录' })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() dto: LoginDto, @Req() req) {
        // return req.user;
        const randomNum = random(16)
        await this.CacheService.set(req.user._id, randomNum, 240000) // 获得随机数存入缓存
        return {
            token: this.JwtService.sign(JSON.stringify({ _id: req.user._id, random: randomNum })) // 按照_id返回 token
        }
    }

    /**
     * 用户注销登录
     */
    @ApiOperation({ summary: '用户注销' })
    @Post('login/out')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async outLogin(@Req() req) {
        let res = await this.model.findById(req.user._id, { nickname: -1 })
        await this.CacheService.set(req.user._id, '', 0)
        return { msg: `用户${res.nickname}已注销` }
    }

    /**
     * 获取用户信息
     */
    @ApiOperation({ summary: '获取用户信息' })
    @Post('info')
    @UseGuards(AuthGuard('jwt')) // 给该接口加上 jwt 策略
    @ApiBearerAuth() // 此接口需要token
    async GetUserInfo(@Req() req) {
        let res = await this.model.findById({ _id: req.user._id, state: 0 })
        let newObj = JSON.parse(JSON.stringify(res)) // 深拷贝对象
        delete newObj.model // 删除mobile key
        return Object.assign(newObj, { mobile: String(res.mobile).substr(0, 3) + '****' + String(res.mobile).substr(7, 11) }) // 合并对象返回
    }

    /**
     * 修改用户信息
     * 只能修改用户普通信息
     */
    @ApiOperation({ summary: '修改用户信息' })
    @Put()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async UpdateUserInfo(@Req() req, @Body() updateDto: UserUpdateDto) {
        let userObj = new Object()
        userObj['avatars'] = updateDto.avatars
        userObj['nickname'] = updateDto.nickname
        userObj['address'] = updateDto.address
        userObj['city'] = updateDto.city
        userObj['login_ip'] = updateDto.login_ip
        await this.model.findByIdAndUpdate(req.user._id, userObj)
        return { msg: '更新成功', code: 0 }
    }

    /**
     * 修改用户重要数据
     * @param id
     */
    @ApiOperation({ summary: '修改用户重要数据 支付、登录 密码' })
    @Put('important')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async UpdateUserImportant(@Req() req, @Body() ImportantUser: ImportantUserDto) {
        let ImportantObj = new Object()
        ImportantObj['password'] = ImportantUser.password
        ImportantObj['pay_pass'] = ImportantUser.pay_pass
        await this.model.findByIdAndUpdate(req.user._id, ImportantObj)
        await this.CacheService.set(req.user._id, '', 1000)
        return { msg: '修改成功', code: 0 }
    }

    /**
     * 用户注册
     * return 受检查限制影响，dto数据传输来的mobile必须是字符串才能校验是否合法，再次返回值中强制转换为number类型
     * 注：这里请求的是淘宝的ip地址解析
     */
    @ApiOperation({ summary: '用户注册' })
    @Post()
    async CreateUser(@Query('code') code: number, @Body() createUserDto: UserCreateDto, @Req() req) {
        try {
            const ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
            // res[0] <--- IP 220.178.171.75
            var res = ip.exec(req.ip)[0]
            if (res === null) this._userIP = '123.125.71.38';
            await koaReq({
                method: 'get',
                uri: TenXunMap.url + `?key=${TenXunMap.key}&ip=${this._userIP}`,
                json: true//设置返回的数据为json
            }, (error, response, body) => {
                this._city = body.result.ad_info.city // 生产模式正常
                this._userIP = res
            })
        } catch (error) {
            this._city = '北京'
            this._userIP = '123.125.71.38'
        }

        if (await this.CacheService.get(createUserDto.mobile) === Number(code)) {
            let obj: any = new Object
            obj['mobile'] = Number(createUserDto.mobile)
            obj['password'] = createUserDto.password
            obj['pay_pass'] = createUserDto.password
            obj['city'] = this._city
            obj['login_ip'] = String(this._userIP)
            await this.model.create(obj)
            await this.CacheService.set(createUserDto.mobile, '', 1000)
            return { msg: '注册成功', code: 0 }
        } else {
            return { msg: '验证码错误', code: -1 }
        }
    }

    /**
     * -----------------------------以下接口仅供后台使用-----------------------------
     * 
     */

    /**
     * 删除用户
     * @param id _id
     */
    @ApiOperation({ summary: '删除用户' })
    @Delete(':id')
    async DeleteUser(@Param('id') id: string) {
        await this.model.findByIdAndDelete(id)
        return { msg: '删除成功', code: 0 }
    }

    /**
     * 修改用户重要数据
     * @param id
     */
    @ApiOperation({ summary: '编辑用户' })
    @Put(':id')
    async UpdateUser(@Param('id') id: string, @Body() UpdateUser: User) {
        await this.model.findByIdAndUpdate(id, UpdateUser)
        return { msg: '编辑成功', code: 0 }
    }
}

