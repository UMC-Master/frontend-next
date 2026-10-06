'use client';

import {
  getCities,
  getDistricts,
  type Location,
} from '@/api/location/location.api';

interface Props {
  locations: Location[];
  city: string;
  district: string;
  onChange: (city: string, district: string) => void;
}
export default function AddressSelector({
  locations,
  city,
  district,
  onChange,
}: Props) {
  const cities = getCities(locations);
  const districts = getDistricts(locations, city);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex gap-4">
        <select
          aria-label="시·도"
          value={city}
          onChange={event => onChange(event.target.value, '')}
          className="h-12 min-w-0 flex-1 rounded-lg border px-3"
        >
          <option value="" disabled>
            시·도 선택
          </option>
          {city && !cities.some(location => location.name === city) && (
            <option value={city}>{city} (기존 주소)</option>
          )}
          {cities.map(location => (
            <option key={location.location_id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
        <select
          aria-label="구·군"
          value={district}
          onChange={event => onChange(city, event.target.value)}
          disabled={!city}
          className="h-12 min-w-0 flex-1 rounded-lg border px-3"
        >
          <option value="" disabled>
            구·군 선택
          </option>
          {district &&
            !districts.some(location => location.name === district) && (
              <option value={district}>{district} (기존 주소)</option>
            )}
          {districts.map(location => (
            <option key={location.location_id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <p className="text-caption1 text-gray-500">
        서버에 등록된 주소만 선택할 수 있습니다.
      </p>
      {!cities.length && (
        <p className="text-caption1">등록된 시·도 목록이 없습니다.</p>
      )}
    </div>
  );
}
