import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { AnalysisData } from './data.d';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { getTimeDistance } from './utils/utils';


const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const LoginCard = React.lazy(() => import('./components/LoginCard'));


interface AnalysisProps {
    dispatch: Dispatch<any>;
    dashboardAndanalysis: AnalysisData
    loading: boolean;
}
interface AnalysisState {
    salesType: 'all' | 'online' | 'stores';
    currentTabKey: string;
    rangePickerValue: RangePickerValue;
    params: {
        startTime: any;
        toTime: any
    }
}

@connect(
    ({
        dashboardAndanalysis,
        loading,
    }: {
        dashboardAndanalysis: any;
        loading: {
            effects: { [key: string]: boolean };
        };
    }) => ({
        dashboardAndanalysis,
        loading: loading.effects['dashboardAndanalysis/fetchData'],
    }),
)
class index extends Component<AnalysisProps, AnalysisState> {

    state: AnalysisState = {
        salesType: 'all',
        currentTabKey: '',
        rangePickerValue: getTimeDistance('year'),
        params: {
            startTime: '2019-12-01',
            toTime: '2019-12-16'
        }
    };
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'dashboardAndanalysis/fetchData'
        })
    }
    
    handleRangePickerChange = (dates: RangePickerValue, dateStrings: [string, string]) => {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
        let params = {
            startTime: dateStrings[0],
            toTime: dateStrings[1]
        }
        const { dispatch } = this.props;

        dispatch({
            type: 'dashboardAndanalysis/fetchLoginAndIncomeFlowData',
            payload: {
                ...params
            }
        });
    };

    render() {
        // const { rangePickerValue, salesType, currentTabKey } = this.state;

        const { dashboardAndanalysis, loading } = this.props;
        const {
            sumIncome,
            todayIncome,
            sumUsers,
            newUsers,
            payUsers,
            newPayUsers,
            dayLoginTimes,
            onlinePlayers,
            loginArr,
            incomeflowArr
        } = dashboardAndanalysis;
        return (
            <div>
                <Suspense fallback={null}>
                    {/* 四个Card */}
                    <IntroduceRow
                        sumincome={sumIncome}
                        todayincome={todayIncome}
                        sumUsers={sumUsers}
                        newUsers={newUsers}
                        payUsers={payUsers}
                        newPayUsers={newPayUsers}
                        dayLoginTimes={dayLoginTimes}
                        onlinePlayers={onlinePlayers}
                        loading={loading} />
                </Suspense>
                <Suspense fallback={null}>
                    <LoginCard
                        loginArr={loginArr}
                        incomeflowArr={incomeflowArr}
                        handleRangePickerChange={this.handleRangePickerChange}
                        loading={loading}
                    />
                </Suspense>
            </div>
        );
    }
}

export default index;