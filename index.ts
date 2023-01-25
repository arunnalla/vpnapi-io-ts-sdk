import axios, { AxiosResponse } from 'axios';
import { InvalidApiKeyException } from './exceptions/InvalidApiKeyException';
import { IpInformation, TooManyRequestsException } from './models';
import { IpResponse } from './types';

class VpnApiIo {
  private static readonly BASE_URL: string = 'https://vpnapi.io/api';

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async queryIp(ipAddress: string): Promise<IpInformation> {
    try {
      const ipResponse: AxiosResponse<IpResponse> = await axios.get(
        `${VpnApiIo.BASE_URL}/${ipAddress}?key=${this.apiKey}`
      );
      return IpInformation.from(ipResponse.data);
    } catch (error) {
      if (error.response.status === 429) {
        throw new TooManyRequestsException(error.message);
      }
      if (error.response.status === 403) {
        throw new InvalidApiKeyException(error.message);
      }
      throw error;
    }
  }
}

export default VpnApiIo;
