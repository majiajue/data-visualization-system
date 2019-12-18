import request from '@/utils/request';
import { FormDataType } from './data.d';
export interface today {
  datetime: string;
}

// 总流水
export async function allFlowSum() {
  return request('/server/income/allSum', {
    method: 'POST',
  });
}

// 今日流水
export async function todayFlowSum(datetime: today) {
  return request('/server/income/today', {
    method: 'POST',
    data: datetime
  });
}

//总注册人数
export async function allRegisterCount() {
  return request('/server/player/registerAllCount', {
    method: 'POST'
  });
}

//今日注册人数
export async function dayRegisterCount(datetime: today) {
  return request('/server/player/registerDayCount', {
    method: 'POST',
    data: datetime
  });
}

// 今日登录人次
export async function dayLoginPersonTime(datetime: today) {
  return request('/server/player/dayLoginPersonTime', {
    method: 'POST',
    data: datetime
  });
}

// 当前在线人数
export async function onLinePlayer(datetime: today) {
  return request('/server/player/onLinePlayer', {
    method: 'POST',
    data: datetime
  });
}



// 每日登陆人数
export async function fetchLoginCount(params: FormDataType) {
  return request('/server/player/countLogin', {
    method: 'POST',
    data: params,
  });
}

// 每日流水总量
export async function fetchIncomeFlow(params: FormDataType) {
  return request('/server/income/detail', {
    method: 'POST',
    data: params,
  });
}
