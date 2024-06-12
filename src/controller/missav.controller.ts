import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { MissavServer } from '../service/missav.server';
import type { MissavDataType } from '../interface';

@Controller('/')
export class MissAvController {
  @Inject()
  ctx: Context;

  @Inject()
  missavServer: MissavServer;

  @Get('/preview-missav')
  async getMissavPage(): Promise<void> {
    await this.ctx.render('previewMissav');
  }

  @Get('/getMissAvData')
  async getMissavData(@Query('path') path: string): Promise<MissavDataType[]> {
    const result = await this.missavServer.getData(path);
    return result;
  }
}
