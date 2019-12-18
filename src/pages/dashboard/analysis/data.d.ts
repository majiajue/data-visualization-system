export interface VisitDataType {
    x: string;
    y: number;
}

export interface SearchDataType {
    index: number;
    keyword: string;
    count: number;
    range: number;
    status: number;
}

export interface OfflineDataType {
    name: string;
    cvr: number;
}

export interface OfflineChartData {
    x: any;
    y1: number;
    y2: number;
}

export interface RadarData {
    name: string;
    label: string;
    value: number;
}

export interface AnalysisData {
    sumIncome: number,//总收入
    todayIncome: number,//今日总收入
    sumUsers: number,//总注册人数
    newUsers: number,//今日注册人数
    payUsers: number,//总付费人数
    newPayUsers: number,//今日付费人数
    dayLoginTimes:number,
    onlinePlayers:number,
    loginArr: LoginTrend[],
    incomeflowArr: Incomeflow[],
}

export interface LoginTrend {
    datetime: string;//日期
    countlogin: number;
}

export interface Incomeflow {
    datetime: string;//日期
    sumIncome: number;
}

export interface FormDataType {
    startTime: string;
    toTime: string;
}
