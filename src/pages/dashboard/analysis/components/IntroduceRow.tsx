import { Col, Icon, Row, Tooltip} from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
// import Trend from './Trend';
import Yuan from '../utils/Yuan';
// import styles from '../style.less';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
};
const IntroduceRow = ({
    sumincome,
    todayincome,//今日总收入
    sumUsers,//总注册人数
    newUsers,//今日注册人数
    payUsers,//总付费人数
    newPayUsers,//今日付费人数
    dayLoginTimes,
    onlinePlayers,
    loading
}: {
    sumincome: number,//总收入
    todayincome: number,//今日总收入
    sumUsers: number,//总注册人数
    newUsers: number,//今日注册人数
    payUsers: number,//总付费人数
    newPayUsers: number,//今日付费人数
    dayLoginTimes:number,
    onlinePlayers:number
    loading: boolean
}) => (
        <Row gutter={24} type="flex">
            {/* 流水总览 */}
            <Col  {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    title={
                        <FormattedMessage id="dashboardandanalysis.analysis.sumIncome" defaultMessage="sumIncome" />
                    }
                    action={
                        <Tooltip
                            title={
                                <FormattedMessage id="dashboardandanalysis.analysis.introduce" defaultMessage="Introduce" />
                            }
                        >
                            <Icon type="info-circle-o" />
                        </Tooltip>
                    }
                    loading={loading}
                    total={() => <Yuan>{sumincome}</Yuan>}
                    footer={
                        <Field
                            label={
                                <FormattedMessage id="dashboardandanalysis.analysis.newIncome" defaultMessage="newIncome" />
                            }
                            value={`￥${numeral(todayincome).format('0,0')}`}
                        />
                    }
                    contentHeight={46}
                >
                    {/* <Trend flag="up" style={{ marginRight: 16 }}>
                        <FormattedMessage id="dashboardandanalysis.analysis.week" defaultMessage="Weekly Changes" />
                        <span className={styles.trendText}>12%</span>
                    </Trend>
                    <Trend flag="down">
                        <FormattedMessage id="dashboardandanalysis.analysis.day" defaultMessage="Daily Changes" />
                        <span className={styles.trendText}>11%</span>
                    </Trend> */}
                </ChartCard>
            </Col>
            {/* 注册人数 */}
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title={<FormattedMessage id="dashboardandanalysis.analysis.sumUsers" defaultMessage="sumUsers" />}
                    action={
                        <Tooltip
                            title={
                                <FormattedMessage id="dashboardandanalysis.analysis.introduce" defaultMessage="Introduce" />
                            }
                        >
                            <Icon type="info-circle-o" />
                        </Tooltip>
                    }
                    total={numeral(sumUsers).format('0,0')}
                    footer={
                        <Field
                            label={
                                <FormattedMessage id="dashboardandanalysis.analysis.day-register" defaultMessage="Daily register" />
                            }
                            value={numeral(newUsers).format('0,0')}
                        />
                    }
                    contentHeight={46}
                >
                    {/* <MiniArea color="#975FE4" data={visitData} /> */}
                </ChartCard>
            </Col>
            {/* 付费人数 */}
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title={<FormattedMessage id="dashboardandanalysis.analysis.payUsers" defaultMessage="payUsers" />}
                    action={
                        <Tooltip
                            title={
                                <FormattedMessage id="dashboardandanalysis.analysis.introduce" defaultMessage="Introduce" />
                            }
                        >
                            <Icon type="info-circle-o" />
                        </Tooltip>
                    }
                    total={numeral(payUsers).format('0,0')}
                    footer={
                        <Field
                            label={
                                <FormattedMessage
                                    id="dashboardandanalysis.analysis.newPayUsers"
                                    defaultMessage="newPayUsers"
                                />
                            }
                            value={numeral(newPayUsers).format('0,0')}
                        />
                    }
                    contentHeight={46}
                >
                    {/* <MiniBar data={visitData} /> */}
                </ChartCard>
            </Col>
            {/* 登陆人数 */}
            <Col {...topColResponsiveProps}>
                <ChartCard
                    bordered={false}
                    loading={loading}
                    title="今日登录人数"
                    contentHeight={46}
                    total={numeral(dayLoginTimes).format('0,0')}
                    action={
                        <Tooltip
                            title={
                                <FormattedMessage id="dashboardandanalysis.analysis.introduce" defaultMessage="Introduce" />
                            }
                        >
                            <Icon type="info-circle-o" />
                        </Tooltip>
                    }
                    footer={
                        <Field
                            label="当前在线人数"
                            value={numeral(onlinePlayers).format('0,0')}
                        />
                    }
                >
                </ChartCard>
            </Col>
        </Row>
    )
export default IntroduceRow;