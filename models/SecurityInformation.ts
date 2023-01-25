import { Builder } from 'builder-pattern';
import { Security } from '../types';

export class SecurityInformation {
  vpn: boolean;
  relay: boolean;
  tor: boolean;
  proxy: boolean;

  isUserIp() {
    return !(this.vpn || this.relay || this.tor || this.proxy);
  }

  static from(security: Security) {
    return Builder(SecurityInformation)
      .proxy(security.proxy)
      .relay(security.relay)
      .tor(security.tor)
      .vpn(security.vpn)
      .build();
  }
}
