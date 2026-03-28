import clsx from 'clsx';

const baseClass =
  'h-12 w-full max-w-[380px] rounded-lg border-[0.4px] bg-gray-100 px-3 text-body1 text-gray-1000 outline-none placeholder:text-gray-800';

/** 로그인·찾기 등 auth 폼 공통 텍스트 필드 클래스 */
export function authTextFieldClassName(hasError = false) {
  return clsx(
    baseClass,
    hasError ? 'border-gray-900' : 'border-gray-500',
  );
}
