import { Provide } from '@midwayjs/core';
import type { GetGistByIdReqType } from '../interface';
import { GistError } from '../error/gist.error';
import { isEmpty, isNil } from 'ramda';
import { Octokit } from '@octokit/core';

@Provide()
export class GistService {
  async getAccessTokenWithMiddleWare() {
    try {
      const result = await fetch(
        'https://api.github.com/repos/shen774411223d/gists-api/git/blobs/c7972f96c51d4740b37553f83b4b9395963c3140'
      ).then(res => res.json());
      const token = atob(result.content);
      return {
        ret: 1,
        data: token,
      };
    } catch (error: any) {
      return {
        ret: 0,
        message: error.message,
      };
    }
  }

  async getMyGists(accessToken: string) {
    try {
      const octokit = new Octokit({
        auth: accessToken,
      });

      const { data } = await octokit.request('GET /gists', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return {
        ret: 1,
        data,
      };
    } catch (error: any) {
      throw new GistError(error);
    }
  }

  async getGistById(data: GetGistByIdReqType) {
    if (isEmpty(data)) {
      throw new GistError(new Error('参数未传递！'));
    }

    if (data && typeof data.gistId !== 'string') {
      throw new GistError(new Error('参数格式错误！'));
    }

    if (
      isNil(data.accessToken) ||
      (!isNil(data.accessToken) && isEmpty(data.accessToken))
    ) {
      throw new GistError(new Error('缺少 accesstoken'));
    }

    const octokit = new Octokit({
      auth: data.accessToken,
    });

    const { data: result } = await octokit.request(
      `GET /gists/${data.gistId}`,
      {
        gist_id: 'GIST_ID',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );

    return {
      ret: 1,
      data: result,
    };
  }
}
