interface Security {
  vpn: boolean;
  proxy: boolean;
  tor: boolean;
  relay: boolean;
}

interface Location {
  city: string;
  region: string;
  country: string;
  continent: string;
  region_code: string;
  country_code: string;
  continent_code: string;
  latitude: string;
  longitude: string;
  time_zone: string;
  locale_code: string;
  metro_code: string;
  is_in_european_union: boolean;
}

interface Network {
  network: string;
  autonomous_system_number: string;
  autonomous_system_organization: string;
}

interface IpResponse {
  ip: string;
  security: Security;
  location: Location;
  network: Network;
}

export { Security, Location, Network, IpResponse };
