import { Provide, makeHttpRequest } from '@midwayjs/core';
import type { WeatherInfo } from '../interface';
import { WeatherEmptyDataError } from '../error/weather.error';

@Provide()
export class WeatherService {
  async getWeather(cityId: string) {
    if (!cityId) {
      throw new WeatherEmptyDataError(new Error('缺少cityId!'));
    }
    try {
      const result = await makeHttpRequest<WeatherInfo>(
        `https://midwayjs.org/resource/${cityId}.json`,
        {
          dataType: 'json',
        }
      );
      if (result.status === 200) {
        return result.data as WeatherInfo;
      }
    } catch (err) {
      console.log('weather service', err);
      throw new WeatherEmptyDataError(err);
    }
  }
}
