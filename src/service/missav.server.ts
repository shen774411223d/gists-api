import { Provide } from '@midwayjs/core';

import type { MissavDataType } from '../interface';

@Provide()
export class MissavServer {
  async getData(path: string) {
    const result = await import(`../static/${path}.json`);
    return result as unknown as MissavDataType[];
  }
}
