import { Controller, Get, Query, Inject, Headers } from '@midwayjs/core';
import { WeatherService } from '../service/weather.service';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class WeatherController {
  @Inject()
  weatherService: WeatherService;

  @Inject()
  ctx: Context;

  @Get('/weather')
  async getWeatherInfo(
    @Query('cityId') cityId: string,
    @Headers() headers: any
  ): Promise<void> {
    const result = await this.weatherService.getWeather(cityId);
    console.log('getWeatherInfo', headers, result);

    if (result) {
      await this.ctx.render('info', result.weatherinfo);
    }
  }
}
