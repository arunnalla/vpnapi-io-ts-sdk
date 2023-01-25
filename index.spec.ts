import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import VpnApiIo from '.';
import mockData from './mock-data.json';
import { TooManyRequestsException } from './models';

const GET_IP_INFO_API_URL = 'https://vpnapi.io/api';

describe('IP information', () => {
  beforeEach(() => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${GET_IP_INFO_API_URL}/8.8.8.8?key=dummy`).reply(200, mockData);
  });

  it('ip in response is same as request', async () => {
    const ipInformation = await new VpnApiIo('dummy').queryIp('8.8.8.8');
    expect(ipInformation.ip).toBe('8.8.8.8');
  });

  it('security is populated from response', async () => {
    const ipInformation = await new VpnApiIo('dummy').queryIp('8.8.8.8');
    expect(ipInformation.security.proxy).toBe(false);
    expect(ipInformation.security.vpn).toBe(false);
    expect(ipInformation.security.relay).toBe(false);
    expect(ipInformation.security.tor).toBe(false);
  });

  it('location is populated from response', async () => {
    const ipInformation = await new VpnApiIo('dummy').queryIp('8.8.8.8');
    expect(ipInformation.location.countryCode).toBe('US');
    expect(ipInformation.location.timeZone).toBe('America/Chicago');
    expect(ipInformation.location.localeCode).toBe('en');
    expect(ipInformation.location.isInEuropeanUnion).toBe(false);
  });

  it('network is populated from response', async () => {
    const ipInformation = await new VpnApiIo('dummy').queryIp('8.8.8.8');
    expect(ipInformation.network.network).toBe('8.8.8.0/24');
    expect(ipInformation.network.autonomousSystemNumber).toBe('AS15169');
    expect(ipInformation.network.autonomousSystemOrganization).toBe('GOOGLE');
  });

  it('check exception when quota for the day is exhausted', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${GET_IP_INFO_API_URL}/8.8.8.8?key=expired_quota_key`).reply(429);
    await expect(new VpnApiIo('expired_quota_key').queryIp('8.8.8.8')).rejects.toThrow(TooManyRequestsException);
  });
});
