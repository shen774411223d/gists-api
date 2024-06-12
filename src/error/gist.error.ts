import { MidwayError } from '@midwayjs/core';

export class GistError extends MidwayError {
  constructor(error: Error) {
    super(error.message, {
      cause: error,
    });
    if (error?.stack) {
      this.stack = error.stack;
    }
  }
}
