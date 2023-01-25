import { Builder } from 'builder-pattern';
import { Location } from '../types';

export class LocationInformation {
  city: string;
  region: string;
  country: string;
  continent: string;
  regionCode: string;
  countryCode: string;
  continentCode: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  localeCode: string;
  metroCode: string;
  isInEuropeanUnion: boolean;

  static from(location: Location) {
    return Builder(LocationInformation)
      .city(location.city)
      .region(location.region)
      .country(location.country)
      .continent(location.continent)
      .regionCode(location.region_code)
      .countryCode(location.country_code)
      .continentCode(location.continent_code)
      .latitude(parseFloat(location.latitude))
      .longitude(parseFloat(location.longitude))
      .timeZone(location.time_zone)
      .localeCode(location.locale_code)
      .metroCode(location.metro_code)
      .isInEuropeanUnion(location.is_in_european_union)
      .build();
  }
}
