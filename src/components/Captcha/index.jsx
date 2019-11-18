import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import omit from 'omit.js';
import styles from './index.less';
import RuleMessage from '../RuleMessage';

const FormItem = Form.Item;

export default class Captcha extends PureComponent {
  static defaultProps = {
    getCaptchaButtonText: 'Captcha',
    getCaptchaSecondText: 'Second',
  };

  interval = undefined;

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    const { onGetCaptcha, form, customProps } = this.props;
    const { checks } = customProps;
    let result = null;
    let checkValues = null;

    if (form && checks) {
      form.validateFields(checks, (err, values) => {
        if (err) {
          result = false;
        } else {
          checkValues = values;
        }
      });
    }
    if (result === false) {
      return;
    }

    result = onGetCaptcha ? onGetCaptcha(checkValues) : null;

    if (result === false) {
      return;
    }

    if (result instanceof Promise) {
      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  getFormItemOptions = ({ onChange, customProps = {}, rules }) => {
    const options = {
      rules: rules || customProps.rules || <RuleMessage message="Please enter Captcha!"/>,
    };

    if (onChange) {
      options.onChange = onChange;
    }

    return options;
  };

  runGetCaptchaCountDown = () => {
    const { countDown } = this.props;
    let count = countDown || 59;
    this.setState({
      count,
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count,
      });

      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {
    // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
    const { count } = this.state;

    const {
      onChange,
      customProps,
      defaultValue,
      rules,
      name,
      getCaptchaButtonText,
      getCaptchaSecondText,
      type,
      form,
      ...restProps
    } = this.props;

    if (!name) {
      return null;
    }

    if (!form) {
      return null;
    }

    const { getFieldDecorator } = form; // get getFieldDecorator props

    const options = this.getFormItemOptions(this.props);
    const otherProps = restProps || {};

    const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
    return (
      <FormItem key="captcha">
        <Row gutter={8}>
          <Col span={14}>
            {getFieldDecorator(name, options)(<Input {...customProps} {...inputProps} />)}
          </Col>
          <Col span={10}>
            <Button
              disabled={!!count}
              className={styles.getCaptcha}
              size="large"
              type="primary"
              onClick={this.onGetCaptcha}
            >
              {count ? `${count} ${getCaptchaSecondText}` : getCaptchaButtonText}
            </Button>
          </Col>
        </Row>
      </FormItem>
    );
  }
}
