import { afterEach, describe, expect, it, vi } from 'vitest';
import { createFetcher } from './fetcher';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

afterEach(() => vi.unstubAllGlobals());

describe('authenticated API requests', () => {
  it('adds Bearer headers and normalizes the base URL', async () => {
    const fetch = vi.fn().mockResolvedValue(json({ result: 'ok' }));
    vi.stubGlobal('fetch', fetch);
    const api = createFetcher({
      baseURL: 'https://example.test/api/v1/',
      getAccessToken: () => 'token',
    });
    await api('/profile', { auth: true });
    expect(fetch.mock.calls[0][0]).toBe('https://example.test/api/v1/profile');
    expect(fetch.mock.calls[0][1].headers.get('Authorization')).toBe(
      'Bearer token',
    );
  });

  it('rejects missing credentials without sending a request', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    const api = createFetcher({ baseURL: 'https://example.test' });
    await expect(api('/profile', { auth: true })).rejects.toMatchObject({
      status: 401,
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('refreshes concurrent expired requests once and replays their bodies', async () => {
    const fetch = vi
      .fn()
      .mockImplementation((_url, options) =>
        Promise.resolve(
          options.headers.get('Authorization') === 'Bearer fresh'
            ? json({ result: 'ok' })
            : json({ message: 'Token has expired' }, 403),
        ),
      );
    vi.stubGlobal('fetch', fetch);
    const refresh = vi.fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return 'fresh';
    });
    const api = createFetcher({
      baseURL: 'https://example.test',
      getAccessToken: () => 'old',
      onRefreshToken: refresh,
    });
    await Promise.all([
      api('/one', { auth: true, method: 'POST', body: '{"value":1}' }),
      api('/two', { auth: true }),
    ]);
    expect(refresh).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledTimes(4);
    expect(
      fetch.mock.calls.find(
        call =>
          call[1].headers.get('Authorization') === 'Bearer fresh' &&
          call[1].body,
      )?.[1].body,
    ).toBe('{"value":1}');
  });

  it('does not refresh a role-based forbidden response', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(json({ message: '관리자 권한이 없습니다.' }, 403)),
    );
    const refresh = vi.fn();
    const clear = vi.fn();
    const api = createFetcher({
      baseURL: 'https://example.test',
      getAccessToken: () => 'old',
      onRefreshToken: refresh,
      onAuthFailure: clear,
    });
    await expect(api('/admin', { auth: true })).rejects.toMatchObject({
      status: 403,
    });
    expect(refresh).not.toHaveBeenCalled();
    expect(clear).not.toHaveBeenCalled();
  });

  it('does not refresh public login failures', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(json({ message: 'Invalid credentials' }, 401)),
    );
    const refresh = vi.fn();
    const api = createFetcher({
      baseURL: 'https://example.test',
      onRefreshToken: refresh,
    });
    await expect(api('/login')).rejects.toMatchObject({ status: 401 });
    expect(refresh).not.toHaveBeenCalled();
  });

  it('clears a rejected refresh session without looping', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(json({ message: 'Token has expired' }, 403));
    vi.stubGlobal('fetch', fetch);
    const { ApiError } = await import('./fetcher');
    const clear = vi.fn();
    const api = createFetcher({
      baseURL: 'https://example.test',
      getAccessToken: () => 'old',
      onRefreshToken: async () => {
        throw new ApiError({ status: 401, message: 'Expired refresh' });
      },
      onAuthFailure: clear,
    });
    await expect(api('/profile', { auth: true })).rejects.toMatchObject({
      status: 401,
    });
    expect(clear).toHaveBeenCalledOnce();
    expect(fetch).toHaveBeenCalledOnce();
  });

  it('preserves the session when refresh fails due to the network', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(json({ message: 'Token has expired' }, 403)),
    );
    const clear = vi.fn();
    const api = createFetcher({
      baseURL: 'https://example.test',
      getAccessToken: () => 'old',
      onRefreshToken: async () => {
        throw new TypeError('Offline');
      },
      onAuthFailure: clear,
    });
    await expect(api('/profile', { auth: true })).rejects.toThrow('Offline');
    expect(clear).not.toHaveBeenCalled();
  });

  it('leaves multipart boundaries to the browser', async () => {
    const fetch = vi.fn().mockResolvedValue(json({ result: 'ok' }));
    vi.stubGlobal('fetch', fetch);
    const api = createFetcher({
      baseURL: 'https://example.test',
      headers: { 'Content-Type': 'application/json' },
    });
    await api('/tips', { body: new FormData(), method: 'POST' });
    expect(fetch.mock.calls[0][1].headers.has('Content-Type')).toBe(false);
  });

  it('preserves a refreshed session when the replay is forbidden by role', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(json({ message: 'Token has expired' }, 403))
        .mockResolvedValueOnce(
          json({ message: '관리자 권한이 없습니다.' }, 403),
        ),
    );
    const clear = vi.fn();
    const api = createFetcher({
      baseURL: 'https://example.test',
      getAccessToken: () => 'old',
      onRefreshToken: async () => 'fresh',
      onAuthFailure: clear,
    });
    await expect(api('/admin', { auth: true })).rejects.toMatchObject({
      status: 403,
    });
    expect(clear).not.toHaveBeenCalled();
  });
});
