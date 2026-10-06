import LargeButton from '@/components/Button/LargeButton/LargeButton';
import {
  useSignupActions,
  useSignupData,
  useSignupStep5Data,
} from '../../hooks/useSignup';
import clsx from 'clsx';
import { INTEREST_CATEGORIES } from './InterestStep.constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signUp } from '@/api/auth/auth.api';

const InterestStep = () => {
  const { setInterests, reset } = useSignupActions();
  const router = useRouter();
  const { interests: selectedInterests } = useSignupStep5Data();
  const { data: allSignupData } = useSignupData(); // 최종 제출을 위해 모든 데이터 가져오기
  const signup = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      reset();
      router.replace('/auth/sign-in');
    },
  });

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    // 이미 선택된 태그인지 확인
    const isSelected = selectedInterests.includes(tag);
    let newInterests: string[];

    if (isSelected) {
      // 이미 선택된 경우, 배열에서 제거 (선택 해제)
      newInterests = selectedInterests.filter(item => item !== tag);
    } else {
      // 선택되지 않은 경우, 배열에 추가 (선택)
      newInterests = [...selectedInterests, tag];
    }
    // 변경된 배열을 Zustand 스토어에 저장
    setInterests(newInterests);
  };

  // 3. 최종 회원가입 완료 핸들러
  const handleSignupComplete = () => {
    if (!allSignupData.isEmailVerified || signup.isPending) return;
    signup.mutate({
      email: allSignupData.email,
      password: allSignupData.password,
      nickname: allSignupData.nickname,
      city: allSignupData.location.city,
      district: allSignupData.location.district,
      hashtags: selectedInterests,
    });
  };

  return (
    <div className="mt-4 flex w-full flex-col justify-start pb-24">
      <div className="text-title1 text-gray-900 whitespace-pre-line">
        {`마지막으로\n 관심사를 골라 주세요.`}
      </div>
      <div className="text-body2 text-gray-600 mt-1">
        해당 관심사를 기반으로 꿀팁 추천을 드립니다.
      </div>

      {/* 4. 관심사 카테고리 및 태그 UI 렌더링 */}
      <div className="flex flex-col gap-5 mt-6 mb-6">
        {INTEREST_CATEGORIES.map(({ category, tags }) => (
          <div key={category} className="flex flex-col gap-3">
            <div className="text-title3 text-gray-800">{category}</div>
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => {
                const isSelected = selectedInterests.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    disabled={signup.isPending}
                    onClick={() => handleTagClick(tag)}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-body2 transition-colors',
                      {
                        'bg-main-500 text-gray-100': isSelected,
                        'bg-gray-200 text-gray-800': !isSelected,
                      },
                    )}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {allSignupData.profileImage && (
        <p className="text-caption1 text-gray-600">
          프로필 이미지 저장은 아직 지원되지 않습니다.
        </p>
      )}
      {signup.error && (
        <p role="alert" className="text-caption1 text-red">
          {signup.error.message}
        </p>
      )}

      {/* 다음 버튼 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <div className="pointer-events-auto w-full max-w-[380px]">
          <LargeButton
            text={signup.isPending ? '가입 중...' : '회원가입 완료'}
            onClick={handleSignupComplete}
            disabled={
              selectedInterests.length === 0 ||
              !allSignupData.isEmailVerified ||
              signup.isPending
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InterestStep;
