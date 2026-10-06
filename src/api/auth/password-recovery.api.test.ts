import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetcher } from '@/lib/api/fetcher';
import { requestPasswordReset, confirmPasswordReset } from './auth.api';

afterEach(() => vi.restoreAllMocks());

describe('password recovery API contract', () => {
  it('requests a reset using the registered email without a duplicate check', async () => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: true, message: 'accepted' });
    await requestPasswordReset('registered@example.com');
    expect(post).toHaveBeenCalledExactlyOnceWith('/password/reset', {
      email: 'registered@example.com',
    });
  });
  it('submits the reset token, not an email verification code', async () => {
    const post = vi
      .spyOn(fetcher, 'post')
      .mockResolvedValue({ isSuccess: true, message: 'reset' });
    await confirmPasswordReset('signed-reset-token', 'Newpass1!');
    expect(post).toHaveBeenCalledWith('/password/reset/confirm', {
      resetToken: 'signed-reset-token',
      newPassword: 'Newpass1!',
    });
  });
  it('surfaces expired token failures', async () => {
    vi.spyOn(fetcher, 'post').mockResolvedValue({
      isSuccess: false,
      message: 'expired token',
    });
    await expect(confirmPasswordReset('expired', 'Newpass1!')).rejects.toThrow(
      'expired token',
    );
  });
});
