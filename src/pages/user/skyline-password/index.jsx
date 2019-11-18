import React, { PureComponent } from 'react';
import RuleMessage from '@/components/RuleMessage';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import Captcha from '@/components/Captcha';
import { Button, Col, Form, Input, Popover, Progress, Row, message } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregister.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregister.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregister.strength.short" />
    </div>
  ),
};
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ userAndpassword, loading }) => ({
  userAndpassword,
  submitting: loading.effects['userAndpassword/submit'],
}))
class UserPassword extends PureComponent {
  state = {
    confirmDirty: false,
    visible: false,
    help: '',
  };

  componentDidUpdate() {
    const { userAndpassword } = this.props;

    if (userAndpassword.status === 'ok') {
      message.success(formatMessage({ id: 'userandpassword.password-result.msg' }));
      router.push({
        pathname: '/user/login',
      });
    }
  }

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  onGetCaptcha = values =>
  new Promise((resolve, reject) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userAndpassword/getCaptcha',
      payload: values.username,
    })
      .then(resolve)
      .catch(reject);
  });

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields(
      {
        force: true,
      },
      (err, values) => {
        if (!err) {
          dispatch({
            type: 'userAndpassword/submit',
            payload: { ...values },
          });
        }
      },
    );
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('password')) {
      callback(
        <RuleMessage messageId="userandpassword.password.twice"/>,
      );
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;

    if (!value) {
      this.setState({
        help: 'userandpassword.password.required',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });

      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }

      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;

        if (value && confirmDirty) {
          form.validateFields(['confirm'], {
            force: true,
          });
        }

        callback();
      }
    }
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible } = this.state;

    return (
      <div>
        <h1>{formatMessage({
          id: 'userandpassword.password.reset-password',
        })}</h1>
        <div style={{ marginBottom: '20px' }} className="primaryColor">
          <RuleMessage messageId="userandpassword.password.contact" />
        </div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem key="username">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: <RuleMessage messageId="userandpassword.username.required" />,
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'userandpassword.username.placeholder',
                })}
              />,
            )}
          </FormItem>
          <Captcha name="captcha" key="captcha"
            form={this.props.form}
            onGetCaptcha={this.onGetCaptcha}
            getCaptchaButtonText={formatMessage({
              id: 'userandpassword.form.get-captcha',
            })}
            getCaptchaSecondText={formatMessage({
              id: 'userandpassword.captcha.second',
            })}
            customProps={{
              size: 'large',
              placeholder: formatMessage({
                id: 'userandpassword.verification-code.placeholder',
              }),
              rules: [
                {
                  required: true,
                  message: <RuleMessage messageId="userandpassword.verification-code.required" />,
                },
              ],
              checks: ['username'],
            }} />
          <FormItem help={
            help && <RuleMessage messageId={help}/>
          }>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                <div
                  style={{
                    padding: '4px 0',
                  }}
                >
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <FormattedMessage id="userandpassword.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({
                    id: 'userandpassword.password.placeholder',
                  })}
                />,
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: <RuleMessage messageId="userandpassword.confirm-password.required"/>,
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({
                  id: 'userandpassword.confirm-password.placeholder',
                })}
              />,
            )}
          </FormItem>
          <Row>
            <Col span={12}>
              <Button
                size="large"
                loading={submitting}
                type="primary"
                htmlType="submit"
                block
              >
                <FormattedMessage id="userandpassword.form.submit" />
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right', lineHeight: '40px' }}>
              <Link type="link" to="/user/login">{formatMessage({
                id: 'userandpassword.password.login',
              })}</Link>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create()(UserPassword);
