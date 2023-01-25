import { Builder } from 'builder-pattern';
import { Network } from '../types';

export class NetworkInformation {
  network: string;
  autonomousSystemNumber: string;
  autonomousSystemOrganization: string;

  static from(network: Network): NetworkInformation {
    return Builder(NetworkInformation)
      .autonomousSystemNumber(network.autonomous_system_number)
      .autonomousSystemOrganization(network.autonomous_system_organization)
      .network(network.network)
      .build();
  }
}
