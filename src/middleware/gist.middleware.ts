import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

import { GistService } from '../service/gist.service';

@Middleware()
export class GistMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const gistService = await ctx.requestContext.getAsync<GistService>(
        GistService
      );
      const { data: accessToken = '' } =
        await gistService.getAccessTokenWithMiddleWare();
      // 可以直接给ctx赋值
      ctx.accessToken = accessToken;
      // 也可使用setAttr函数设置
      ctx.setAttr('accessToken', accessToken);
      const result = await next();
      return result;
    };
  }
  static getName() {
    return 'GetGithubAccessToken';
  }
}
