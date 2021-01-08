import request from '@/utils/request';
import { apiServer } from '@/utils/constants';

const api = {
  redis: '/util/api/util',
};

export async function read(params) {
  return request(apiServer + api.redis + '/' + params.name);
}