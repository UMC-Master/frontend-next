// Isolated browser with API mocks: never sends writes to the live backend.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const origin = process.env.UI_TEST_ORIGIN || 'http://localhost:3100';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ serviceWorkers: 'block' });
context.setDefaultTimeout(15000);
const requests = [];
const errors = [];
let loginFails = true;
let signupFails = true;
let createFails = true;
let bookmarked = true;
let liked = false;
let comments = [];
const profile = {
  user_id: 1,
  nickname: '통합테스트',
  email: 'test@example.com',
  profile_image_url: null,
  city: null,
  district: null,
  role: 'USER',
  hashtags: ['청소'],
};
const tip = {
  tipId: 7,
  title: '통합테스트 팁',
  content: '서버 응답 본문',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
  author: { userId: 1, nickname: '통합테스트', profileImageUrl: null },
  hashtags: [],
  imageUrls: [],
  likesCount: 2,
  savesCount: 3,
};
const challenge = {
  challengeId: 1,
  imageUrl: null,
  title: '통합테스트 챌린지',
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  descriptionTitle: '소개',
  descriptionContent: '소개 본문',
  verificationMethod: '사진을 첨부해 주세요.',
  likesCount: 1,
  bookmarksCount: 2,
  sharesCount: 3,
  hashtags: ['청소'],
};
const attempt = {
  attempt_id: 42,
  challenge_id: 1,
  user_id: 1,
  status: 'START',
};
await context.route('**/*', async route => {
  const req = route.request();
  const url = new URL(req.url());
  if (!['fetch', 'xhr'].includes(req.resourceType())) {
    return url.origin === origin ? route.continue() : route.abort();
  }
  if (url.origin === origin && !url.pathname.startsWith('/api/v1/'))
    return route.continue();
  const path = url.pathname.replace('/api/v1', '');
  const method = req.method();
  requests.push({ path, method, search: url.search, body: req.postData() });
  const reply = (result, status = 200, message = 'OK') =>
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ isSuccess: status === 200, result, message }),
    });
  if (path === '/login')
    return loginFails
      ? reply(null, 400, '로그인 테스트 오류')
      : reply({ accessToken: 'ui-access', refreshToken: 'ui-refresh' });
  if (path === '/login/kakao') {
    assert.equal(req.postDataJSON().code, 'ui-kakao-code');
    return reply({ accessToken: 'ui-access', refreshToken: 'ui-refresh' });
  }
  if (
    [
      '/check-email',
      '/auth/send-verification-email',
      '/auth/verify-email-code',
    ].includes(path)
  )
    return reply({});
  if (path === '/signup')
    return signupFails
      ? reply(null, 400, '가입 테스트 오류')
      : reply({ user_id: 1 });
  if (path === '/tips' && method === 'POST') {
    assert.match(
      req.headers()['content-type'],
      /multipart\/form-data; boundary=/,
    );
    assert.match(req.postData(), /name="hashtags"/);
    assert.match(req.postData(), /name="files"/);
    return createFails
      ? reply(null, 400, '등록 테스트 오류')
      : reply({ tip: { tips_id: 7 } });
  }
  if (path === '/deactivate') return reply({});
  if (path === '/profile') return reply(profile);
  if (path === '/statistics')
    return reply({ quizScore: 85, tipsSharedCount: 12, likesReceived: 45 });
  if (path === '/tips/sorted') {
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || 5);
    return reply({
      tips:
        page === 1
          ? Array.from({ length: limit }, (_, i) => ({
              ...tip,
              tipId: i + 7,
              title: `통합테스트 팁 ${i + 1}`,
            }))
          : [],
    });
  }
  if (path === '/hashtags/popular')
    return reply([{ hashtagId: 1, name: '청소', count: 3 }]);
  if (path === '/tips/search')
    return reply(url.searchParams.get('query') === '없음' ? [] : [tip]);
  if (path === '/users/saved-tips')
    return reply(bookmarked ? [{ ...tip, likeCount: 2, saveCount: 3 }] : []);
  if (path === '/tips/7' && method === 'GET')
    return reply({
      ...tip,
      user: {
        userId: 1,
        nickname: profile.nickname,
        profileImageUrl: null,
        isInfluencer: false,
      },
      media: [],
      isLiked: liked,
      isBookmarked: bookmarked,
    });
  if (path === '/tips/7/like') {
    liked = !liked;
    return reply({});
  }
  if (path === '/tips/7/bookmark') {
    bookmarked = !bookmarked;
    return reply({});
  }
  if (path === '/comments') return reply(comments);
  if (path === '/tips/7/comments' && method === 'POST') {
    const comment = {
      comment_id: 9,
      tips_id: 7,
      comment: req.postDataJSON().comment,
      user: { user_id: 1, nickname: profile.nickname },
      created_at: tip.createdAt,
    };
    comments = [comment];
    return reply({ data: comment });
  }
  if (path === '/tips/7/comments/9' && method === 'PUT') {
    comments[0].comment = req.postDataJSON().comment;
    return reply({ data: comments[0] });
  }
  if (path === '/tips/7/comments/9' && method === 'DELETE') {
    comments = [];
    return reply({});
  }
  if (path === '/tips/7' && method === 'DELETE') return reply({});
  if (path === '/challenges') return reply(challenge);
  if (path === '/challenges/1/start') return reply(attempt);
  if (path === '/challenges/42/verify') {
    assert.match(
      req.headers()['content-type'],
      /multipart\/form-data; boundary=/,
    );
    assert.match(req.postData(), /name="image_list"/);
    return reply({ verification_id: 8, attempt_id: 42, status: 'PENDING' });
  }
  if (path === '/challenges/42/stop')
    return reply({ ...attempt, status: 'CANCELED' });
  if (path === '/password/reset') return reply({});
  if (path === '/password/reset/confirm') return reply({});
  throw new Error(`Unexpected API: ${method} ${path}`);
});
try {
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${origin}/auth/sign-in`);
  await page.getByLabel('이메일', { exact: true }).fill('test@example.com');
  await page.getByLabel('비밀번호', { exact: true }).fill('Testpass1!');
  await page.getByRole('button', { name: '로그인하기', exact: true }).click();
  await page.getByText('로그인 테스트 오류', { exact: true }).waitFor();
  loginFails = false;
  await page.getByRole('button', { name: '로그인하기', exact: true }).click();
  await page.waitForURL(`${origin}/main`);
  await page.getByText('통합테스트 팁 1', { exact: true }).first().waitFor();
  for (const sort of ['latest', 'likes', 'saves'])
    assert(
      requests.some(
        r => r.path === '/tips/sorted' && r.search.includes(`sort=${sort}`),
      ),
    );
  for (const routeName of ['today-tips', 'monthly-tips', 'trending-tips']) {
    await page.goto(`${origin}/${routeName}`);
    await page
      .getByRole('heading', { name: '통합테스트 팁 1', exact: true })
      .waitFor();
    await page.getByRole('button', { name: '저장많은순', exact: true }).click();
    if (routeName !== 'monthly-tips') {
      await page.getByRole('button', { name: '다음', exact: true }).click();
      await page.getByText('표시할 팁이 없습니다.', { exact: true }).waitFor();
      await page.getByRole('button', { name: '이전', exact: true }).click();
      await page
        .getByRole('heading', { name: '통합테스트 팁 1', exact: true })
        .waitFor();
    } else
      assert.equal(
        await page.getByRole('heading', { name: /통합테스트 팁/ }).count(),
        10,
      );
  }
  await page.goto(`${origin}/search`);
  await page.getByRole('button', { name: '#청소', exact: true }).waitFor();
  await page.goto(`${origin}/search?hashtags=${encodeURIComponent('청소')}`);
  await page.getByRole('heading', { name: tip.title, exact: true }).waitFor();
  await page.goto(`${origin}/search?query=${encodeURIComponent('없음')}`);
  await page
    .getByText('검색 결과가 존재하지 않습니다. 다른 검색어로 검색해 보세요!', {
      exact: true,
    })
    .waitFor();
  await page.goto(`${origin}/saved-tips`);
  await page.getByRole('heading', { name: tip.title, exact: true }).waitFor();
  await page.goto(`${origin}/tips/7`);
  await page.getByText(tip.content, { exact: true }).waitFor();
  await page.getByRole('button', { name: '좋아요', exact: true }).click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('[aria-label="좋아요"]')
        ?.getAttribute('aria-pressed') === 'true',
  );
  await page.getByRole('button', { name: '북마크', exact: true }).click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('[aria-label="북마크"]')
        ?.getAttribute('aria-pressed') === 'false',
  );
  await page
    .getByRole('textbox', { name: '댓글 내용', exact: true })
    .fill('댓글 작성 테스트');
  await page.getByRole('button', { name: '댓글 등록', exact: true }).click();
  await page.getByText('댓글 작성 테스트', { exact: true }).waitFor();
  await page.getByRole('button', { name: '수정', exact: true }).click();
  await page
    .getByRole('textbox', { name: '댓글 수정 내용', exact: true })
    .fill('댓글 수정 테스트');
  await page.getByRole('button', { name: '저장', exact: true }).click();
  await page.getByText('댓글 수정 테스트', { exact: true }).waitFor();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: '삭제', exact: true }).click();
  await page.getByText('첫 댓글을 작성해 보세요.', { exact: true }).waitFor();
  await page.getByRole('button', { name: '삭제하기', exact: true }).click();
  await page
    .getByRole('button', { name: '삭제하기', exact: true })
    .last()
    .click();
  await page.waitForURL(`${origin}/main`);
  await page.goto(`${origin}/saved-tips`);
  await page
    .getByText('저장된 꿀팁이 존재하지 않습니다', { exact: true })
    .waitFor();
  await page.goto(`${origin}/challenges`);
  await page.getByText(challenge.title, { exact: true }).waitFor();
  await page.goto(`${origin}/challenges/1`);
  await page
    .getByRole('button', { name: '챌린지 시작하기', exact: true })
    .click();
  await page.getByText('챌린지가 시작되었습니다.', { exact: true }).waitFor();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await page.getByRole('link', { name: '인증하기', exact: true }).click();
  await page.locator('input[type=file]').setInputFiles({
    name: 'proof.png',
    mimeType: 'image/png',
    buffer: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aO1sAAAAASUVORK5CYII=',
      'base64',
    ),
  });
  await page.getByRole('button', { name: '인증 제출', exact: true }).click();
  await page
    .getByText('인증 요청이 접수되었습니다.', { exact: true })
    .waitFor();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await page.waitForURL(`${origin}/challenges/1`);
  await page.getByRole('button', { name: '그만두기', exact: true }).click();
  await page
    .getByRole('button', { name: '그만두기', exact: true })
    .last()
    .click();
  await page.getByText('챌린지가 중단되었습니다.', { exact: true }).waitFor();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await page
    .getByRole('button', { name: '챌린지 시작하기', exact: true })
    .waitFor();
  assert(
    requests.some(
      r => r.path === '/challenges/42/stop' && r.method === 'PATCH',
    ),
  );
  await page.goto(`${origin}/auth/find-password`);
  await page.getByLabel('이메일', { exact: true }).fill('test@example.com');
  await page.getByRole('button', { name: '재설정 요청', exact: true }).click();
  await page
    .getByRole('status')
    .filter({ hasText: '재설정 요청이 접수되었습니다.' })
    .waitFor();
  await page.goto(`${origin}/auth/find-password?resetToken=ui-reset`);
  await page.getByLabel('새 비밀번호', { exact: true }).fill('Changedpass1!');
  await page
    .getByLabel('새 비밀번호 확인', { exact: true })
    .fill('Changedpass1!');
  await page
    .getByRole('button', { name: '비밀번호 재설정', exact: true })
    .click();
  await page.waitForURL(`${origin}/auth/sign-in`);
  assert.deepEqual(
    JSON.parse(requests.find(r => r.path === '/password/reset/confirm').body),
    { resetToken: 'ui-reset', newPassword: 'Changedpass1!' },
  );
  await page.goto(`${origin}/auth/sign-up`);
  await page.getByText('약관 전체 동의하기', { exact: true }).click();
  await page.getByRole('button', { name: '다음', exact: true }).click();
  await page
    .getByPlaceholder('이메일을 입력해 주세요.', { exact: true })
    .fill('new@example.com');
  page.once('dialog', dialog => dialog.accept());
  await page.getByText('인증하기', { exact: true }).click();
  await page
    .getByPlaceholder('인증 번호를 입력해 주세요.', { exact: true })
    .fill('123456');
  await page.getByText('인증완료', { exact: true }).click();
  await page.getByRole('button', { name: '다음', exact: true }).click();
  await page
    .getByPlaceholder('비밀번호를 입력해 주세요.', { exact: true })
    .fill('Testpass1!');
  await page
    .getByPlaceholder('비밀번호를 다시 입력해 주세요.', { exact: true })
    .fill('Testpass1!');
  await page.getByRole('button', { name: '다음', exact: true }).click();
  await page
    .getByPlaceholder('닉네임을 입력해 주세요.', { exact: true })
    .fill('새사용자');
  await page.getByRole('button', { name: '다음', exact: true }).click();
  await page.getByRole('button', { name: '#청소', exact: true }).click();
  await page
    .getByRole('button', { name: '회원가입 완료', exact: true })
    .click();
  await page.getByText('가입 테스트 오류', { exact: true }).waitFor();
  signupFails = false;
  await page
    .getByRole('button', { name: '회원가입 완료', exact: true })
    .click();
  await page.waitForURL(`${origin}/auth/sign-in`);
  const signupBody = JSON.parse(requests.find(r => r.path === '/signup').body);
  assert.equal(signupBody.nickname, '새사용자');
  assert.deepEqual(signupBody.hashtags, ['청소']);
  await context.addInitScript(() =>
    sessionStorage.setItem('homemaster-kakao-state', 'ui-state'),
  );
  await page.goto(`${origin}/auth/sign-in?code=ui-kakao-code&state=ui-state`);
  await page.waitForURL(`${origin}/main`);
  await page.goto(`${origin}/tips/create`);
  await page
    .getByPlaceholder('제목을 입력해 주세요. (최대 24자)', { exact: true })
    .fill('등록 테스트');
  await page
    .getByPlaceholder('내용을 입력해 주세요. (최대 500자)', { exact: true })
    .fill('등록 본문 테스트');
  await page.getByRole('button', { name: '#청소', exact: true }).click();
  await page.locator('input[type=file]').setInputFiles({
    name: 'tip.png',
    mimeType: 'image/png',
    buffer: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aO1sAAAAASUVORK5CYII=',
      'base64',
    ),
  });
  await page.getByRole('button', { name: '작성완료', exact: true }).click();
  await page.getByText('등록 테스트 오류', { exact: true }).waitFor();
  assert.equal(
    await page
      .getByPlaceholder('제목을 입력해 주세요. (최대 24자)', { exact: true })
      .inputValue(),
    '등록 테스트',
  );
  createFails = false;
  await page.getByRole('button', { name: '작성완료', exact: true }).click();
  await page.getByText('꿀팁이 등록되었습니다.', { exact: true }).waitFor();
  await page.getByRole('button', { name: '확인', exact: true }).click();
  await page.waitForURL(`${origin}/tips/7`);
  await page.goto(`${origin}/mypage`);
  await page
    .getByRole('heading', { name: profile.nickname, exact: true })
    .waitFor();
  await page.getByRole('button', { name: '로그아웃', exact: true }).click();
  await page
    .getByRole('button', { name: '로그아웃', exact: true })
    .last()
    .click();
  await page.waitForURL(`${origin}/auth/sign-in`);
  assert.equal(
    await page.evaluate(
      () =>
        JSON.parse(sessionStorage.getItem('homemaster-auth')).state.accessToken,
    ),
    null,
  );
  assert.deepEqual(errors, []);
  console.log(
    'PASS: login/email/Kakao callback; signup verification/failure/retry; main/list/search/saved; tip create/failure/retry/reactions/comment CRUD/delete; challenge start/multipart verification/stop; password request/reset; profile/statistics/logout',
  );
} finally {
  await browser.close();
}
