import React, { PureComponent } from 'react';
import { Slider, InputNumber, Col } from 'antd';
import styles from './index.less';

export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.initValue(),
    };
  }

  initValue = () => {
    const { min = 0, value = 0 } = this.props;
    const inputValue = typeof value === 'number' ? value : min;
    return inputValue;
  }

  getValidateValue = value => {
    const { min = 0, max = 0 } = this.props;
    if (typeof value !== 'number') {
      return min;
    }
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  handleChange = value => {
    this.setState(() => ({
      inputValue: this.getValidateValue(value),
    }), () => {
      this.onChange();
    });
  };


  onChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.state.inputValue);
    }
  }

  render() {
    const { inputValue } = this.state;
    const { min, max, minLabel, maxLabel } = this.props;
    return (
      <div>
        <Col span={18}>
          <Slider
            style={{ marginLeft: 10, marginRight: 10 }}
            min={min}
            max={max}
            onChange={this.handleChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
          <div className={styles.sliderLabel}>
            <span>{minLabel}</span>
            <span className={styles.maxLabel}>{maxLabel}</span>
          </div>

        </Col>
        <Col span={6}>
          <InputNumber
            min={min}
            max={max}
            value={inputValue}
            onChange={this.handleChange}
          />
        </Col>
      </div>
    )
  }
}
