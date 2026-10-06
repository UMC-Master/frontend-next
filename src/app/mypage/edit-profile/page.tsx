'use client';

import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  getProfile,
  updateProfile,
  type UserProfile,
  type ProfileUpdateRequest,
} from '@/api/auth/auth.api';
import { getLocations, type Location } from '@/api/location/location.api';
import { useAuthStore } from '@/features/auth/stores/authStore';
import AddressSelector from '@/features/mypage/components/AddressSelector';
import ProfileSection from '@/features/mypage/components/ProfileSection';
import InterestTagSelector from '@/features/mypage/components/InterestTagSelector';
import SuccessModal from '@/common/components/Modal/SuccessModal';

function EditProfileForm({
  profile,
  locations,
}: {
  profile: UserProfile;
  locations: Location[];
}) {
  const [nickname, setNickname] = useState(profile.nickname || '');
  const [city, setCity] = useState(profile.city || '');
  const [district, setDistrict] = useState(profile.district || '');
  const [hashtags, setHashtags] = useState<string[]>(profile.hashtags || []);
  const [successOpen, setSuccessOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const locked = useRef(false);
  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      setSuccessOpen(true);
    },
  });
  const valid =
    !!nickname.trim() &&
    hashtags.length > 0 &&
    hashtags.length <= 5 &&
    (!city || !!district);
  const submit = async () => {
    if (locked.current || !valid || mutation.isSuccess) return;
    locked.current = true;
    const data: ProfileUpdateRequest = {
      nickname: nickname.trim(),
      hashtags,
      ...(city && district ? { city, district } : {}),
    };
    try {
      await mutation.mutateAsync(data);
    } catch {
      /* Display the API error and keep entered values. */
    } finally {
      locked.current = false;
    }
  };
  return (
    <div className="flex flex-col gap-6 pb-32">
      <fieldset
        disabled={mutation.isPending || mutation.isSuccess}
        className="flex flex-col gap-6"
      >
        <ProfileSection
          nickname={nickname}
          imageUrl={profile.profile_image_url}
        />
        <p className="text-caption1 text-gray-600">
          프로필 이미지 수정은 현재 지원되지 않습니다.
        </p>
        <label className="flex flex-col gap-2">
          닉네임
          <input
            value={nickname}
            onChange={event => setNickname(event.target.value)}
            className="h-12 rounded-lg border px-3"
          />
        </label>
        <AddressSelector
          locations={locations}
          city={city}
          district={district}
          onChange={(nextCity, nextDistrict) => {
            setCity(nextCity);
            setDistrict(nextDistrict);
          }}
        />
        <InterestTagSelector
          selectedInterests={hashtags}
          onToggle={tag =>
            setHashtags(current =>
              current.includes(tag)
                ? current.filter(item => item !== tag)
                : current.length < 5
                  ? [...current, tag]
                  : current,
            )
          }
        />
        {!hashtags.length && (
          <p role="alert" className="text-red">
            관심사는 최소 1개 선택해 주세요. 전체 삭제는 아직 지원되지 않습니다.
          </p>
        )}
        <div className="flex flex-wrap gap-2" aria-label="선택한 관심사">
          {hashtags.map(tag => (
            <button
              type="button"
              key={tag}
              aria-label={`${tag} 관심사 선택 해제`}
              onClick={() =>
                setHashtags(current => current.filter(item => item !== tag))
              }
            >
              #{tag} ×
            </button>
          ))}
        </div>
      </fieldset>
      {mutation.error && (
        <p role="alert" className="text-red">
          {mutation.error.message}
        </p>
      )}
      <button
        type="button"
        disabled={!valid || mutation.isPending || mutation.isSuccess}
        onClick={submit}
        className="h-13 rounded-2xl bg-main-500 text-gray-100 disabled:bg-gray-500"
      >
        {mutation.isPending ? '저장 중...' : '프로필 변경'}
      </button>
      <SuccessModal
        isOpen={successOpen}
        onClose={() => router.replace('/mypage')}
        title="프로필 변경이 완료되었습니다."
        buttonText="마이페이지로 이동"
      />
    </div>
  );
}

export default function EditProfilePage() {
  const accessToken = useAuthStore(state => state.accessToken);
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!accessToken,
  });
  const locations = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
    enabled: !!accessToken,
  });
  if (!accessToken)
    return <Link href="/auth/sign-in">로그인 후 프로필 수정하기</Link>;
  if (profile.isPending || locations.isPending)
    return <p role="status">프로필과 주소를 불러오는 중...</p>;
  if (profile.isError || locations.isError)
    return (
      <div role="alert">
        {profile.error?.message || locations.error?.message}
        <button
          type="button"
          onClick={() => {
            profile.refetch();
            locations.refetch();
          }}
        >
          다시 시도
        </button>
      </div>
    );
  return (
    <EditProfileForm
      key={profile.data.user_id}
      profile={profile.data}
      locations={locations.data}
    />
  );
}
