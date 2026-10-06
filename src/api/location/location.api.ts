import { ApiError, fetcher } from '@/lib/api/fetcher';
import type { ApiResponse } from '@/lib/api/api.types';

export interface Location {
  location_id: number;
  name: string;
  parent: { id: number | null; name: string | null };
}

export const getLocations = async () => {
  const response =
    await fetcher.get<ApiResponse<{ location_list: Location[] }>>('/locations');
  if (!response.isSuccess || !Array.isArray(response.result?.location_list))
    throw new ApiError({
      status: 400,
      message: response.message || '주소 목록 조회에 실패했습니다.',
    });
  return response.result.location_list;
};

export const getCities = (locations: Location[]) =>
  locations.filter(
    location => location.parent.id === null || location.parent.id === 0,
  );
export const getDistricts = (locations: Location[], cityName: string) => {
  const city = getCities(locations).find(
    location => location.name === cityName,
  );
  return city
    ? locations.filter(location => location.parent.id === city.location_id)
    : [];
};
