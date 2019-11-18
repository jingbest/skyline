import { Alert } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { connect } from 'dva';
import LoginComponents from './components/Login';

@connect(({ userAndlogin, loading }) => ({
  userAndlogin,
  submitting: loading.effects['userAndlogin/login'],
}))
class Login extends Component {
  loginForm = undefined;

  handleSubmit = (err, values) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userAndlogin/login',
        payload: { ...values },
      });
    }
  };

  onGetCaptcha = values =>
    new Promise((resolve, reject) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'userAndlogin/getCaptcha',
        payload: values.username,
      })
        .then(resolve)
        .catch(reject);
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status } = userAndlogin;
    return (
      <>
        <h1>
          {formatMessage({
            id: 'userandlogin.login.welcome',
          })}
        </h1>
        {status === 'error' &&
          !submitting &&
          this.renderMessage(
            formatMessage({
              id: 'userandlogin.login.message-invalid-credentials',
            }),
          )}
        <LoginComponents
          onGetCaptcha={this.onGetCaptcha}
          onSubmit={this.handleSubmit}
        ></LoginComponents>
      </>
    );
  }
}

export default Login;
