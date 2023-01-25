import axios, { AxiosResponse } from 'axios';
import { IpInformation } from './models';
import { IpResponse } from './types';

class VpnApiIo {
  private static readonly BASE_URL: string = 'https://vpnapi.io/api';

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async queryIp(ipAddress: string): Promise<IpInformation> {
    const ipResponse: AxiosResponse<IpResponse> = await axios.get(
      `${VpnApiIo.BASE_URL}/${ipAddress}?key=${this.apiKey}`
    );

    return IpInformation.from(ipResponse.data);
  }
}

export default VpnApiIo;
