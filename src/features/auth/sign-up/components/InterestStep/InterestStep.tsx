import LargeButton from '@/components/Button/LargeButton/LargeButton';
import {
  useSignupActions,
  useSignupData,
  useSignupStep5Data,
} from '../../hooks/useSignup';
import clsx from 'clsx';
import { INTEREST_CATEGORIES } from './InterestStep.constants';

const InterestStep = () => {
  const { setInterests } = useSignupActions();
  const { interests: selectedInterests } = useSignupStep5Data();
  const { data: allSignupData } = useSignupData(); // 최종 제출을 위해 모든 데이터 가져오기

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
    // TODO: 서버로 최종 회원가입 데이터를 전송하는 API 호출
    console.log('최종 회원가입 데이터:', allSignupData);
    alert('회원가입이 완료되었습니다!');
    // 예: Muation 호출 -> 성공 시 로그인 페이지로 리다이렉트 등
  };

  return (
    <div className="w-full flex flex-col justify-start mt-4">
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

      {/* 다음 버튼 */}
      <div className="mt-1 mb-6">
        <LargeButton
          text="회원가입 완료"
          onClick={handleSignupComplete}
          disabled={selectedInterests.length === 0}
        />
      </div>
    </div>
  );
};

export default InterestStep;
