import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { MissavServer } from '../service/missav.server';

@Controller('/')
export class MissAvController {
  @Inject()
  ctx: Context;

  @Inject()
  missavServer: MissavServer;

  @Get('/preview-missav')
  async getMissavPage(@Query('path') path: string): Promise<void> {
    const result = await this.missavServer.getData(path);
    await this.ctx.render('previewMissav', {
      data: result.map((item, index) => ({ ...item, index: index + 1 })),
    });
  }
}
