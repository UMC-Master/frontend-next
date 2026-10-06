const STATE_KEY = 'homemaster-kakao-state';

export const startKakaoLogin = () => {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  if (!clientId || !redirectUri)
    throw new Error('카카오 로그인 설정을 확인해 주세요.');
  const state = crypto.randomUUID();
  sessionStorage.setItem(STATE_KEY, state);
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    state,
  });
  window.location.assign(`https://kauth.kakao.com/oauth/authorize?${params}`);
};

export const verifyKakaoState = (state: string | null) => {
  const expected = sessionStorage.getItem(STATE_KEY);
  sessionStorage.removeItem(STATE_KEY);
  if (!state || !expected || expected !== state)
    throw new Error('카카오 로그인 요청이 만료되었습니다. 다시 시도해 주세요.');
};
