import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { GistError } from '../error/gist.error';

@Catch(GistError)
export class GistFilterError {
  async catch(err: GistError, ctx: Context) {
    ctx.logger.error(err);
    return {
      ret: 0,
      msg: err.message,
    };
  }
}
