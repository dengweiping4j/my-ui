import request from '@/utils/request';
import { apiServer } from '@/utils/constants';

const api = {
  blog: '/blog/api/blog',
};

export async function get(params) {
  return request(apiServer + api.blog + '/' + params.id);
}

export async function query(params) {
  return request(apiServer + api.blog + '/query?page=' + params.page + '&pageSize=' + params.pageSize, {
    method: 'POST',
    body: params.queryData,
  });
}

export async function create(params) {
  return request(apiServer + api.blog, {
    method: 'POST',
    body: params.data,
  });
}
