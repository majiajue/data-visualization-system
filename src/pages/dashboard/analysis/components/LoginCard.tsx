import { Card, DatePicker, Tabs } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import React from 'react';
import { LoginTrend, Incomeflow } from '../data.d';
import styles from '../style.less';
import timeForMat from '@/utils/getTime';
import { Bar } from './Charts';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;


const loginScale = {
    x: {
        alias: '日期',
    },
    y: {
        alias: '登录人次',
        min: 0,
    }
};
const incomeScale = {
    x: {
        alias: '日期',
    },
    y: {
        alias: '流水收入',
        min: 0,
    }
};

const LoginCard = ({
    loginArr,
    incomeflowArr,
    handleRangePickerChange,
    loading,
}: {
    incomeflowArr: Incomeflow[];
    loginArr: LoginTrend[];
    loading: boolean;
    handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
}) => (
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
            <div className={styles.salesCard}>
                <Tabs
                    tabBarExtraContent={
                        <div className={styles.salesExtraWrap}>
                            <RangePicker
                                ranges={{
                                    '近7日': [moment(timeForMat(7).startTime), moment(timeForMat(7).toTime)],
                                    '近30日': [moment(timeForMat(30).startTime), moment(timeForMat(30).toTime)],
                                    '本月': [moment().startOf('month'), moment().endOf('month')]
                                }}
                                defaultValue={[moment(timeForMat(30).startTime), moment(timeForMat(30).toTime)]}
                                format="YYYY-MM-DD"
                                onChange={handleRangePickerChange}
                                style={{ width: 256 }}
                            />
                        </div>
                    }
                    size="large"
                    tabBarStyle={{ marginBottom: 24 }}
                >
                    <TabPane
                        tab={<FormattedMessage id="dashboardandanalysis.analysis.loginSum" defaultMessage="loginSum" />}
                        key="sales"
                    >
                        <div className={styles.salesBar}>
                            <Bar
                                height={295}
                                title={
                                    <FormattedMessage
                                        id="dashboardandanalysis.analysis.loginSum-trend"
                                        defaultMessage="loginSum-trend"
                                    />
                                }
                                data={loginArr}
                                scale={loginScale}
                            />
                        </div>

                    </TabPane>
                    <TabPane
                        tab={<FormattedMessage id="dashboardandanalysis.analysis.Flowing-water" defaultMessage="Flowing-water" />}
                        key="views"
                    >
                        <div className={styles.salesBar}>
                            <Bar
                                height={295}
                                title={
                                    <FormattedMessage
                                        id="dashboardandanalysis.analysis.Flowing-water-trend"
                                        defaultMessage="Sales Trend"
                                    />
                                }
                                data={incomeflowArr}
                                scale={incomeScale}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </Card>
    );

export default LoginCard;
