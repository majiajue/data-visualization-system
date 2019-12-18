import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { AnalysisData } from './data.d';
import {
    fetchLoginCount,
    fetchIncomeFlow,
    allFlowSum,
    todayFlowSum,
    allRegisterCount,
    dayRegisterCount,
    dayLoginPersonTime,
    onLinePlayer
} from './service';
import timeForMat from '@/utils/getTime';
import getToday from '@/utils/getToday';

export type Effect = (
    action: AnyAction,
    effects: EffectsCommandMap & { select: <T>(func: (state: AnalysisData) => T) => T },
) => void;

export interface ModelType {
    namespace: string;
    state: AnalysisData;
    effects: {
        fetchData: Effect;
        fetchLoginAndIncomeFlowData: Effect
    };
    reducers: {
        save: Reducer<AnalysisData>;
        clear: Reducer<AnalysisData>;
    };
}

const initState = {
    sumIncome: 0,//总收入
    todayIncome: 0,//今日总收入
    sumUsers: 0,//总注册人数
    newUsers: 0,//今日注册人数
    payUsers: 0,//总付费人数
    newPayUsers: 0,//今日付费人数
    dayLoginTimes:0,
    onlinePlayers:0,
    loginArr: [],
    incomeflowArr: []
};

const Model: ModelType = {
    namespace: 'dashboardAndanalysis',

    state: initState,

    effects: {
        *fetchData({ payload }, { call, put }) {
            let params = timeForMat(30)
            let today = getToday()
            const response = yield call(allFlowSum);

            const todayIncome = yield call(todayFlowSum, today);
            // 总流水收入 = 流水收入（来自mysql）+ 今日流水收入（来自impala，实时）
            response.sumIncome = Number(response.sumIncome) + Number(todayIncome.todayincome);
            response.todayIncome = todayIncome.todayincome;

            const sumUsers = yield call(allRegisterCount)
            const newUsers = yield call(dayRegisterCount, params);
            response.sumUsers = Number(sumUsers.sumUsers) + Number(newUsers.newusers);
            response.newUsers = newUsers.newusers;

            const dayLoginTimes = yield call(dayLoginPersonTime, today);
            response.dayLoginTimes = dayLoginTimes.daylogintimes;

            const onlinePlayers = yield call(onLinePlayer, today)
            response.onlinePlayers = onlinePlayers.onlineplayer;

            const loginCountArr = yield call(fetchLoginCount, params)
            const incomeflowArr = yield call(fetchIncomeFlow, params)

            loginCountArr.map((item: any) => {
                item.y = Number(item.y)
            })
            incomeflowArr.map((item: any) => {
                item.y = Number(item.y)
            })
            response.loginArr = loginCountArr
            response.incomeflowArr = incomeflowArr
            // console.log(response)
            yield put({
                type: 'save',
                payload: response
            });
        },
        *fetchLoginAndIncomeFlowData({ payload }, { call, put }) {
            const loginCountArr = yield call(fetchLoginCount, payload)
            const incomeflowArr = yield call(fetchIncomeFlow, payload)
            loginCountArr.map((item: any) => {
                item.y = Number(item.y)
            })
            incomeflowArr.map((item: any) => {
                item.y = Number(item.y)
            })
            let obj = { loginArr: [], incomeflowArr: [] }
            obj.loginArr = loginCountArr;
            obj.incomeflowArr = incomeflowArr
            yield put({
                type: 'save',
                payload: obj
            });
        }

    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
        clear() {
            return initState;
        },
    },
};

export default Model;