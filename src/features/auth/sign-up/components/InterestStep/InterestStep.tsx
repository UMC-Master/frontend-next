import Image from 'next/image';
import LargeButton from '@/components/Button/LargeButton/LargeButton';
import SuccessModal from '@/common/components/Modal/SuccessModal';
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
  });
  const finishSignup = () => {
    reset();
    router.replace('/auth/sign-in');
  };

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
    if (!allSignupData.isEmailVerified || signup.isPending || signup.isSuccess)
      return;
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
    <div className="mt-4 flex w-full flex-1 flex-col">
      <div className="whitespace-pre-line text-title1 leading-normal text-gray-900">
        {`마지막으로\n 관심사를 골라 주세요.`}
      </div>
      <div className="text-body2 text-gray-600 mt-1">
        해당 관심사를 기반으로 꿀팁 추천을 드립니다.
      </div>

      {/* 4. 관심사 카테고리 및 태그 UI 렌더링 */}
      <div className="mt-6 flex flex-col gap-5">
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
                    disabled={signup.isPending || signup.isSuccess}
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
        <p className="mt-3 text-caption1 text-gray-600">
          프로필 이미지 저장은 아직 지원되지 않습니다.
        </p>
      )}
      {signup.error && (
        <p role="alert" className="mt-3 text-caption1 text-red">
          {signup.error.message}
        </p>
      )}

      {/* 다음 버튼 */}
      <div className="mt-auto pt-6">
        <LargeButton
          text={signup.isPending ? '가입 중...' : '회원가입 완료'}
          onClick={handleSignupComplete}
          disabled={
            selectedInterests.length === 0 ||
            !allSignupData.isEmailVerified ||
            signup.isPending ||
            signup.isSuccess
          }
        />
      </div>
      <SuccessModal
        isOpen={signup.isSuccess}
        onClose={finishSignup}
        title="회원가입이 완료되었습니다."
        buttonText="로그인 하러가기"
        blurBackdrop={false}
        illustration={
          <div className="relative size-[200px] overflow-hidden">
            <Image
              src="/brand/signup-complete-logo.gif"
              alt=""
              width={675}
              height={335}
              unoptimized
              className="absolute left-[calc(50%-3px)] top-[calc(50%+0.5px)] h-[335px] w-[675px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        }
      />
    </div>
  );
};

export default InterestStep;
