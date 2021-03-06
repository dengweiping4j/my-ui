import request from '@/utils/request';
import { apiServer } from '@/utils/constants';

const api = {
  user: '/auth/login',
};

export async function login(params) {
  return request(apiServer + api.user, {
    method: 'POST',
    body: params.data,
  });
}