import request from '@/utils/request';
import { apiServer } from '@/utils/constants';

const api = {
  generate: '/api/generator',
};

export async function read(params) {
  return request(apiServer + api.generate + '/' + params.name);
}