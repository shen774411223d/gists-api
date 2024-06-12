import { Catch } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { WeatherEmptyDataError } from '../error/weather.error';

@Catch(WeatherEmptyDataError)
export class WeatherErrorFilter {
  async catch(err: WeatherEmptyDataError, ctx: Context) {
    ctx.logger.error(err);
    return `<html><body><h1>${
      err.message
    }<br />Date: ${new Date()}</h1></body></html>`;
  }
}
