import { Form, Select, Input, Button, Row, Col } from 'antd';
import React, { PureComponent } from 'react';
import Link from 'umi/link';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import Captcha from '@/components/Captcha';
import RuleMessage from '@/components/RuleMessage'

const FormItem = Form.Item;
const { Option } = Select;

class Login extends PureComponent {
  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      regions: [
        { value: 'jack', name: 'Jack' },
        { value: 'lucy', name: 'Lucy' },
        { value: 'tom', name: 'Tom' },
      ],
      domains: [
        { value: 'domain1', name: 'Domain1' },
        { value: 'domain2', name: 'Domain2' },
        { value: 'domain3', name: 'Domain3' },
      ],
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;

    if (form) {
      form.validateFields(
        {
          force: true,
        },
        (err, values) => {
          if (onSubmit) {
            onSubmit(err, values);
          }
        },
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const regionOptions = this.state.regions.map(it => (
      <Option value={it.value} key={it.value}>{it.name}</Option>
    ));
    const domainOptions = this.state.domains.map(it => (
      <Option value={it.value} key={it.value}>{it.name}</Option>
    ));
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem key="region">
            {getFieldDecorator('region', {
              rules: [
                {
                  required: true,
                  message: <RuleMessage messageId="userandlogin.region.required" />,
                },
              ],
            })(
              <Select
                size="large"
                placeholder={formatMessage({
                  id: 'userandlogin.region.placeholder',
                })}
                showSearch
                optionFilterProp="children"
                filterOption={
                  (input, option) => (
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  )
                }
              >
                {regionOptions}
              </Select>,
            )}
          </FormItem>
          <FormItem key="domain">
            {getFieldDecorator('domain', {
              rules: [
                {
                  required: true,
                  message: <RuleMessage messageId="userandlogin.domain.required" />,
                },
              ],
            })(
              <Select
                size="large"
                placeholder={formatMessage({
                  id: 'userandlogin.domain.placeholder',
                })}
                showSearch
                optionFilterProp="children"
                filterOption={
                  (input, option) => (
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  )
                }
              >
                {domainOptions}
              </Select>,
            )}
          </FormItem>
          <FormItem key="username">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: <RuleMessage messageId="userandlogin.username.required" />,
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({
                  id: 'userandlogin.username.placeholder',
                })}
              />,
            )}
          </FormItem>
          <FormItem key="password">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: <RuleMessage messageId="userandlogin.password.required" />,
                },
              ],
            })(
              <Input.Password
                size="large"
                placeholder={formatMessage({
                  id: 'userandlogin.password.placeholder',
                })}
              />,
            )}
          </FormItem>
          <Captcha name="captcha"
            form={this.props.form}
            onGetCaptcha={this.props.onGetCaptcha}
            getCaptchaButtonText={formatMessage({
              id: 'userandlogin.form.get-captcha',
            })}
            getCaptchaSecondText={formatMessage({
              id: 'userandlogin.captcha.second',
            })}
            customProps={{
              size: 'large',
              placeholder: formatMessage({
                id: 'userandlogin.verification-code.placeholder',
              }),
              rules: [
                {
                  required: true,
                  message: <RuleMessage messageId="userandlogin.verification-code.required" />,
                },
              ],
              checks: ['username'],
            }} />
          <Row style={{ marginBottom: 16 }}>
            <Link type="link" className={styles.passwordLink} to="/user/password">
              {formatMessage({
                id: 'userandlogin.login.forgot-password',
              })}
            </Link>
            <Link type="link" className={styles.registerLink} to="/user/register">
              {formatMessage({
                id: 'userandlogin.login.signup',
              })}
            </Link>
          </Row>
          <Row>
            <Col span={12}>
              <Button type="primary" htmlType="submit" size="large" block>
                {formatMessage({
                  id: 'userandlogin.login.login',
                })}
              </Button>
            </Col>
          </Row>

        </Form>
      </div>
    )
  }
}

export default Form.create()(Login);
