import request from '@/utils/request';
import { apiServer } from '@/utils/constants';

const api = {
  blog: '/blog/api/blog',
};

export async function get(params) {
  return request(apiServer + api.blog + '/1001');
}

export async function create(params) {
  return request(apiServer + api.blog + '/create', {
    method: 'POST',
    body: params.data,
  });
}
