import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { getProfile, updateProfile } from './auth.api';
import {
  getLocations,
  getCities,
  getDistricts,
  type Location,
} from '@/api/location/location.api';

afterEach(() => vi.restoreAllMocks());
const locations: Location[] = [
  { location_id: 1, name: '서울특별시', parent: { id: null, name: null } },
  { location_id: 2, name: '강남구', parent: { id: 1, name: '서울특별시' } },
  { location_id: 3, name: '부산광역시', parent: { id: null, name: null } },
  { location_id: 4, name: '해운대구', parent: { id: 3, name: '부산광역시' } },
];
describe('profile editing contract', () => {
  it('reads the actual string hashtag array from profile', async () => {
    vi.spyOn(fetcher, 'get').mockResolvedValue({
      isSuccess: true,
      result: { user_id: 1, hashtags: ['청소', '봄'] },
    });
    expect((await getProfile()).hashtags).toEqual(['청소', '봄']);
  });
  it('loads location_list and restricts districts by parent id', async () => {
    const get = vi
      .spyOn(fetcher, 'get')
      .mockResolvedValue({
        isSuccess: true,
        result: { location_list: locations },
      });
    expect(await getLocations()).toEqual(locations);
    expect(get).toHaveBeenCalledWith('/locations');
    expect(getCities(locations).map(location => location.name)).toEqual([
      '서울특별시',
      '부산광역시',
    ]);
    expect(
      getDistricts(locations, '부산광역시').map(location => location.name),
    ).toEqual(['해운대구']);
    expect(getDistricts(locations, 'unknown')).toEqual([]);
  });
  it('sends supported fields and does not expose the raw update response', async () => {
    const put = vi
      .spyOn(fetcher, 'put')
      .mockResolvedValue({
        isSuccess: true,
        result: { user_id: 1, password: 'backend-internal-hash' },
      });
    const data = {
      nickname: '닉네임',
      city: '서울특별시',
      district: '강남구',
      hashtags: ['청소'],
    };
    expect(await updateProfile(data)).toBeUndefined();
    expect(put).toHaveBeenCalledWith('/profile', data, { auth: true });
  });
  it('surfaces rejected profile saves', async () => {
    vi.spyOn(fetcher, 'put').mockResolvedValue({
      isSuccess: false,
      message: 'unknown hashtag',
    });
    await expect(
      updateProfile({ nickname: 'name', hashtags: ['unknown'] }),
    ).rejects.toThrow('unknown hashtag');
  });
});
