import request from '@/utils/request';
import { apiServer } from '@/utils/constants';

const api = {
  dataConnection: '/api/dataConnection',//数据连接接口
};

export async function queryList(params) {
  return request(apiServer + api.dataConnection+'/queryWhere' ,{
    method: 'POST',
    body: params.queryBuilder,
  });
}

export async function testConnect(params) {
  return request(apiServer + api.dataConnection + '/testConnect', {
    method: 'POST',
    body: params.data,
  });
}

export async function save(params) {
  return request(apiServer + api.dataConnection, {
    method: 'POST',
    body: params.data,
  });
}

export async function edit(params) {
  return request(apiServer + api.dataConnection + '/' + params.data.id, {
    method: 'PUT',
    body: params.data,
  });
}