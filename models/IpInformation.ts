import { Builder } from 'builder-pattern';
import { IpResponse } from '../types';
import { LocationInformation } from './LocationInformation';
import { NetworkInformation } from './NetworkInformation';
import { SecurityInformation } from './SecurityInformation';

export class IpInformation {
  ip: string;
  security: SecurityInformation;
  location: LocationInformation;
  network: NetworkInformation;

  static from(response: IpResponse): IpInformation {
    const security = SecurityInformation.from(response.security);
    const location = LocationInformation.from(response.location);
    const network = NetworkInformation.from(response.network);

    return Builder(IpInformation)
      .ip(response.ip)
      .location(location)
      .network(network)
      .security(security)
      .build();
  }
}
