import { Alert, Checkbox} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
// import Link from 'umi/link';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { LoginParamsType } from '@/services/login';
import router from 'umi/router';

const {UserName, Password, Submit } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userAndlogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
  isRemember: number;
}

export interface FormDataType {
  username: string;
  password: string;
}

@connect(({ userAndlogin, loading, }: {
  userAndlogin: StateType; loading: {
    effects: { [key: string]: string; };
  };
}) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}),
)
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
    isRemember: 1,
  };

  componentDidMount() {
    if (localStorage.getItem('antd-pro-authority')) {
      router.push(`/`);
    }
  }

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
    if (e.target.checked) {
      this.setState({
        isRemember: 1,
      });
    } else {
      this.setState({
        isRemember: 0,
      });
    }
  };

  handleSubmit = (err: unknown, values: LoginParamsType) => {
    // const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userAndlogin/login',
        payload: {
          ...values,
          rememberMe: this.state.isRemember
        },
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status, type: loginType } = userAndlogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          {/* <Tab key="account" tab={formatMessage({ id: 'user-login.login.tab-login-credentials' })}> */}
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'user-login.login.message-invalid-credentials' }),
              )}
            <UserName
              name="username"
              placeholder={`${formatMessage({ id: 'user-login.login.userName' })}: admin or user`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'user-login.login.password' })}: ant.design`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="user-login.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
