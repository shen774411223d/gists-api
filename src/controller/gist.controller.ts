import { Controller, Post, Body, Inject, SetHeader } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { GistService } from '../service/gist.service';
import { GistMiddleware } from '../middleware/gist.middleware';

import type { GetGistByIdReqType } from '../interface';

@Controller('/gistsApi')
export class GistsController {
  @Inject()
  gistService: GistService;

  @Inject()
  ctx: Context;

  get accessToken(): string {
    return this.ctx.getAttr('accessToken');
  }

  @Post('/getMyGists', { middleware: [GistMiddleware] })
  async getMyGists(): Promise<any> {
    const result = await this.gistService.getMyGists(this.accessToken);
    return result;
  }

  @Post('/getGistById', { middleware: [GistMiddleware] })
  @SetHeader('x-test-header', 'test-value')
  async getGistById(@Body() data: GetGistByIdReqType): Promise<any> {
    const accessToken = this.ctx.getAttr('accessToken') as string;
    const result = await this.gistService.getGistById({ ...data, accessToken });
    return result;
  }
}
