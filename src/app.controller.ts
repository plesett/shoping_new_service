import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, UploadedFiles, Delete, Query, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { CacheService } from './cache.service';
import { ToolFNService } from './tool.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AliOOS } from '../config/index'
import * as fs from 'fs';
const stringRandom = require('string-random');
var path = require('path')
const multer = require('multer');
const MAO = require('multer-aliyun-oss');
const crypto = require("crypto")
const OSS = require('ali-oss');

@Controller()
@ApiTags('公用模块')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly CacheService: CacheService,
    private readonly ToolFNService: ToolFNService
  ) { }

  /**
   * 
   * @param mobile 手机号码
   */
  @ApiOperation({ summary: '发送手机验证码' })
  @Post('code/:mobile')
  async SendCode(@Param('mobile') mobile: number) {
    // 查询该用户是否已经发送验证码未过期
    // return await this.CacheService.set(mobile.toString(), '' , 1000)
    if (!!await this.CacheService.get(mobile.toString())) {
      return { msg: '请稍后重试', code: -1 }
    } else {
      const code = this.ToolFNService.randomAccess()
      await this.CacheService.set(mobile.toString(), code, 60)
      console.log(await this.CacheService.get(mobile.toString()))
      return { msg: '发送成功', code } // 调试阶段
    }
  }

  /**
   * 阿里云oos
   * AccessKeyID：*****
   * AccessKeySecret：*****
   * 
   * <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
   *    <input type="file" name="file" id="" />
   *    <input type="submit" value="提交">
   * </form>
   */
  @ApiOperation({ summary: '上传图片' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async PushFile(@UploadedFile() file) {
    let client = new OSS({
      region: AliOOS.region,
      accessKeyId: AliOOS.accessKeyId,
      accessKeySecret: AliOOS.accessKeySecret,
      bucket: AliOOS.bucket
    });
    const name = stringRandom(16, {numbers: false});
    fs.writeFileSync('./pubilc/temporary/' + name + file.originalname, file.buffer);
    try {
      // let result = await client.put('object-name', new Buffer(file.buffer));
      let result = await client.put(name + file.originalname, './pubilc/temporary/' + name + file.originalname);
      fs.unlinkSync('./pubilc/temporary/' + name + file.originalname)
      return { msg: '上传成功', code: 0, url: result.url, key: name + file.originalname }
    } catch (e) {
      // console.log(e);
      return { msg: '上传失败', code: -1 }
    }
  }

  /**
   * 删除阿里云图片
   * XXX.png
   */
  @ApiOperation({ summary: '删除阿里云图片' })
  @Delete('delete')
  async DeleteAliOOS(@Query('key') key: string) {
    console.log(key)
    let client = new OSS({
      region: AliOOS.region,
      accessKeyId: AliOOS.accessKeyId,
      accessKeySecret: AliOOS.accessKeySecret,
      bucket: AliOOS.bucket
    });
    try {
      await client.delete(key);
      return { msg: '删除成功', code: 0 }
    } catch (error) {
      // console.log(error);
      return { msg: '删除失败', code: -1 }
    }
  }
}
