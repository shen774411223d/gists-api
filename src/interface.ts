/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface WeatherInfo {
  weatherinfo: {
    city: string;
    cityid: string;
    temp: string;
    WD: string;
    WS: string;
    SD: string;
    AP: string;
    njd: string;
    WSE: string;
    time: string;
    sm: string;
    isRadar: string;
    Radar: string;
  };
}

export interface GetGistByIdReqType {
  gistId: string;
  accessToken: string;
}

export interface GetGistByIdResType {
  ret: number;
  data: any;
}

export interface MissavDataType {
  img: string;
  video: string;
  name: string;
  link: string;
}
