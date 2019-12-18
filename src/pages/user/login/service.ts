import request from '@/utils/request';
import { FormDataType } from './index';

export async function accountLogin(params: FormDataType) {
  return request('/server/auth/login', {
    method: 'POST',
    data: params,
  });
}

