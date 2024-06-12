import { MidwayError } from '@midwayjs/core';

export class WeatherEmptyDataError extends MidwayError {
  constructor(err?: Error) {
    super(err.message, {
      cause: err,
    });
    if (err?.stack) {
      this.stack = err.stack;
    }
  }
}
