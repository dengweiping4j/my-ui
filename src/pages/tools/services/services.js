import request from '@/utils/request';
import { apiServer } from '@/utils/constants';

const api = {
  redis: '/api-redis/api/redis/',
};

export async function read(params) {
  return request(apiServer + api.redis + params.name);
}