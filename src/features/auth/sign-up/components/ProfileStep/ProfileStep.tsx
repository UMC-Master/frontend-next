import CarmeraIcon from '@/assets/svgs/Camera.svg';
import LargeButton from '@/components/Button/LargeButton/LargeButton';
import ProfileRegionDropdowns from './ProfileRegionDropdowns/ProfileRegionDropdowns';
import { useSignupActions, useSignupStep4Data } from '../../hooks/useSignup';
import { useForm } from 'react-hook-form';
import {
  ProfileStepForm,
  profileStepSchema,
} from '../../schema/profileStep.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const ProfileStep = () => {
  const { nextStep, setNickname, setProfileImage } = useSignupActions();
  const { nickname, profileImage: storedProfileImage } = useSignupStep4Data();

  // 이미지 파일 입력 필드에 접근하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 미리보기 이미지 URL 상태
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 파일 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setProfileImage(file); // Zustand 전역 상태에 File 객체 저장
    } else {
      setProfileImage(null); // 파일 선택 취소 시
    }
  };

  // 프로필 이미지 영역 클릭 시 파일 입력 필드 클릭
  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  // 미리보기 이미지 URL이 변경될 때마다 URL.revokeObjectURL 호출하여 메모리 누수 방지
  useEffect(() => {
    if (storedProfileImage) {
      const newPreviewUrl = URL.createObjectURL(storedProfileImage);
      setPreviewImage(newPreviewUrl);
      return () => URL.revokeObjectURL(newPreviewUrl);
    } else {
      setPreviewImage(null);
    }
  }, [storedProfileImage]);

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileStepForm>({
    resolver: zodResolver(profileStepSchema),
    mode: 'onChange',
    defaultValues: {
      nickname, // 전역 상태의 초기값을 설정
    },
  });

  const nicknameValue = watch('nickname');

  // 컴포넌트 마운트 시, 이미 전역 상태에 이미지가 있으면 미리보기를 설정
  useEffect(() => {
    if (storedProfileImage) {
      const imageUrl = URL.createObjectURL(storedProfileImage);
      setPreviewImage(imageUrl);
      // 컴포넌트 언마운트 시 URL 해제
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [storedProfileImage]);

  useEffect(() => {
    // form의 닉네임 값이 변경될 때마다 전역 상태를 업데이트합니다.
    setNickname(nicknameValue);
  }, [nicknameValue, setNickname]);

  return (
    <div className="mt-4 flex w-full flex-col justify-start pb-24">
      <div className="text-title1 text-gray-900 whitespace-pre-line">
        {`홈마스터에서 활동을 위한\n 개인 정보를 입력해 주세요.`}
      </div>
      <div className="text-body2 text-gray-600 mt-1">
        프로필 사진과 주소는 선택 사항입니다.
      </div>

      {/* 프로필 이미지 설정 */}
      <div className="flex justify-center items-center mt-8">
        {/* 1. 포지셔닝의 기준이 될 새로운 relative 컨테이너 */}
        <div className="relative w-25 h-25">
          {/* 2. 이미지를 동그랗게 잘라내기 위한 overflow-hidden 컨테이너 */}
          <div
            className="w-full h-full rounded-[100px] bg-gray-300 cursor-pointer overflow-hidden flex items-center justify-center"
            onClick={handleProfileImageClick}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt="프로필 미리보기"
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            ) : (
              <></>
            )}
          </div>

          {/* 3. 카메라 아이콘을 overflow-hidden의 영향이 없는 바깥으로 이동 */}
          <div
            className="w-10 h-10 bg-gray-1000 rounded-[100px] absolute top-17 left-17 flex items-center justify-center cursor-pointer"
            onClick={handleProfileImageClick} // 아이콘 클릭 시에도 동일하게 동작하도록 추가
          >
            <CarmeraIcon />
          </div>

          {/* 숨겨진 파일 입력 필드 */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* 닉네임 설정 */}
      <div className="flex flex-col gap-1 mt-7">
        <input
          {...register('nickname')}
          type="text"
          placeholder="닉네임을 입력해 주세요."
          className="text-body1 placeholder:text-gray-900 text-gray-900 p-3 border-[0.4px] border-gray-900 rounded-lg h-12 w-full max-w-[380px]"
        />
        {/* 유효성 검사 에러 메시지 표시 */}
        {errors.nickname && (
          <p className="text-caption1 text-red h-4.5">
            {errors.nickname.message}
          </p>
        )}
      </div>

      {/* 지역 설정 드롭다운 */}
      <div className="mt-5 flex w-full min-w-0 max-w-[380px] flex-col gap-2">
        <ProfileRegionDropdowns />
        {/* 지역 설정 설명 */}
        <p className="text-caption1 text-gray-500">
          주소를 입력하시면 해당 지역에서 지원하는 1인가구 프로그램을 확인할 수
          있습니다.
        </p>
      </div>

      {/* 다음 버튼 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <div className="pointer-events-auto w-full max-w-[380px]">
          <LargeButton text="다음" onClick={nextStep} disabled={!isValid} />
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
