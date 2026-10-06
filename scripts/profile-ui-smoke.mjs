// Run against a local production/dev server with NEXT_PUBLIC_API_BASE_URL set.
// All API requests are intercepted; no real account data is read or changed.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const origin = process.env.UI_TEST_ORIGIN || 'http://localhost:3100';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ serviceWorkers: 'block' });
context.setDefaultTimeout(15000);
const errors = [];
let profileFails = false;
let saveFails = true;
let savedBody;
let profileReads = 0;
const profile = {
  user_id: 1,
  nickname: '연동테스트',
  email: 'test@example.com',
  profile_image_url: null,
  city: '서울특별시',
  district: '강남구',
  role: 'USER',
  hashtags: ['청소'],
};
const locations = [
  { location_id: 1, name: '서울특별시', parent: { id: null, name: null } },
  { location_id: 2, name: '강남구', parent: { id: 1, name: '서울특별시' } },
  { location_id: 3, name: '부산광역시', parent: { id: null, name: null } },
  { location_id: 4, name: '해운대구', parent: { id: 3, name: '부산광역시' } },
];
await context.route('**/*', async route => {
  const request = route.request();
  if (request.resourceType() !== 'fetch' && request.resourceType() !== 'xhr') {
    if (new URL(request.url()).origin !== origin) return route.abort();
    return route.continue();
  }
  const path = new URL(request.url()).pathname;
  const reply = (result, status = 200, message = 'OK') =>
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({ isSuccess: status === 200, result, message }),
    });
  if (path.endsWith('/profile')) {
    assert.equal(request.headers().authorization, 'Bearer ui-test-token');
    if (request.method() === 'PUT') {
      savedBody = request.postDataJSON();
      if (saveFails) return reply(null, 400, '저장 테스트 오류');
      Object.assign(profile, savedBody);
      return reply({ user_id: 1 });
    }
    profileReads++;
    return profileFails ? reply(null, 500, '조회 테스트 오류') : reply(profile);
  }
  if (path.endsWith('/locations')) return reply({ location_list: locations });
  if (path.endsWith('/statistics'))
    return reply({ quizScore: 85, tipsSharedCount: 12, likesReceived: 45 });
  // RSC navigations are local fetches, not API requests.
  if (new URL(request.url()).origin === origin && !path.includes('/api/'))
    return route.continue();
  throw new Error(`Unexpected API request: ${request.method()} ${path}`);
});
try {
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${origin}/mypage/rank`);
  await page
    .getByRole('link', { name: '로그인 후 등급 정보 확인하기' })
    .waitFor();
  assert.equal(profileReads, 0);
  await context.addInitScript(() =>
    sessionStorage.setItem(
      'homemaster-auth',
      JSON.stringify({
        state: {
          accessToken: 'ui-test-token',
          refreshToken: 'ui-test-refresh',
        },
        version: 0,
      }),
    ),
  );
  await page.reload();
  await page.getByRole('heading', { name: '연동테스트' }).waitFor();
  await page
    .getByText('현재 등급·포인트 조회는 지원되지 않습니다.', { exact: true })
    .waitFor();
  assert.equal(await page.getByText('현재 포인트 2,000pt').count(), 0);
  await page.getByRole('button', { name: '자취 새싹', exact: true }).click();
  await page
    .getByText('0 ~ 299pt이면 자취 새싹입니다.', { exact: true })
    .waitFor();
  profileFails = true;
  await page.reload();
  await page
    .getByText('조회 테스트 오류', { exact: true })
    .waitFor({ timeout: 15000 });
  profileFails = false;
  await page.getByRole('button', { name: '다시 시도' }).click();
  await page.getByRole('heading', { name: '연동테스트' }).waitFor();
  await page.goto(`${origin}/mypage/edit-profile`);
  const nickname = page.getByRole('textbox', { name: '닉네임', exact: true });
  await nickname.waitFor();
  assert.equal(await nickname.inputValue(), '연동테스트');
  await nickname.fill('변경테스트');
  await page
    .getByRole('combobox', { name: '시·도' })
    .selectOption('부산광역시');
  assert.equal(
    await page.getByRole('combobox', { name: '구·군' }).inputValue(),
    '',
  );
  assert.equal(
    await page
      .getByRole('button', { name: '프로필 변경', exact: true })
      .isDisabled(),
    true,
  );
  await page.getByRole('combobox', { name: '구·군' }).selectOption('해운대구');
  await page.getByRole('button', { name: '#봄', exact: true }).click();
  await page.getByRole('button', { name: '프로필 변경', exact: true }).click();
  await page.getByText('저장 테스트 오류', { exact: true }).waitFor();
  assert.equal(await nickname.inputValue(), '변경테스트');
  assert.deepEqual(savedBody, {
    nickname: '변경테스트',
    city: '부산광역시',
    district: '해운대구',
    hashtags: ['청소', '봄'],
  });
  saveFails = false;
  await page.getByRole('button', { name: '프로필 변경', exact: true }).click();
  await page
    .getByText('프로필 변경이 완료되었습니다.', { exact: true })
    .waitFor();
  await page
    .getByRole('button', { name: '마이페이지로 이동', exact: true })
    .click();
  await page.waitForURL(`${origin}/mypage`);
  await page.getByRole('heading', { name: '변경테스트' }).waitFor();
  assert.deepEqual(errors, []);
  console.log(
    'PASS: rank auth/profile/error/retry/guide; profile address/reset/payload/failure/retry/cache/navigation',
  );
} finally {
  await browser.close();
}
