import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import {
  requestSignupVerification,
  verifySignupEmail,
  signUp,
} from './auth.api';
import { useSignupStore } from '@/features/auth/sign-up/stores/signupStore';

afterEach(() => {
  vi.restoreAllMocks();
  useSignupStore.getState().actions.reset();
});

describe('signup API contract', () => {
  it('checks duplicates before sending verification mail', async () => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValueOnce({ isSuccess: true, message: 'available' })
      .mockResolvedValueOnce({ message: 'sent' });
    await requestSignupVerification('user@example.com');
    expect(post.mock.calls).toEqual([
      ['/check-email', { email: 'user@example.com' }],
      ['/auth/send-verification-email', { email: 'user@example.com' }],
    ]);
  });
  it('does not send mail for an unavailable email', async () => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: false, message: 'duplicate' });
    await expect(requestSignupVerification('used@example.com')).rejects.toThrow(
      'duplicate',
    );
    expect(post).toHaveBeenCalledTimes(1);
  });
  it('accepts the plain message verification response', async () => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ message: 'verified' });
    await verifySignupEmail('user@example.com', '123456');
    expect(post).toHaveBeenCalledWith('/auth/verify-email-code', {
      email: 'user@example.com',
      code: '123456',
    });
  });
  it('sends hashtag names and location with the signup payload', async () => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: true, result: { user_id: 1 } });
    const data = {
      email: 'user@example.com',
      password: 'secret',
      nickname: 'home',
      city: '서울',
      district: '강남구',
      hashtags: ['청소'],
    };
    expect(await signUp(data)).toEqual({ user_id: 1 });
    expect(post).toHaveBeenCalledWith('/signup', data);
  });
  it('invalidates email verification when the address changes', () => {
    const actions = useSignupStore.getState().actions;
    actions.setEmail('first@example.com');
    actions.setVerificationCode('123456');
    actions.setEmailVerified(true);
    actions.setEmail('second@example.com');
    expect(useSignupStore.getState().data).toMatchObject({
      isEmailVerified: false,
      verificationCode: '',
    });
  });
});
