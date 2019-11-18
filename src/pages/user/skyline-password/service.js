import request from '@/utils/request';

export async function fakePassword(params) {
  return request('/api/password', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/password/captcha?mobile=${mobile}`);
}
