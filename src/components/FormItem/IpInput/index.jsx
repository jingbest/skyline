import React, { PureComponent } from 'react';
import { Button, Input, Icon, Tooltip } from 'antd';
import styles from './index.less';
import { positiveIntegerRegex } from '@/utils/regex';

export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      value: this.initIp(props.poolValue),
    };
  }

  initIp = poolValue => {
    if (poolValue) {
      return poolValue.split('/')[0];
    }
    return '172.168.11.0';
  }

  handleClick = e => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    this.handleEditVisible(true);
  }

  handleEditVisible = flag => {
    const { canEdit = false } = this.props;
    if (!canEdit) {
      return;
    }
    this.setState({
      isEdit: !!flag,
    }, () => {
      this.handleValueChange('', this.state.isEdit, '');
    });
  }

  handleInputChange = (newValue, index) => {
    console.log(newValue, index);
    const numbers = this.state.value.split('/')[0].split('.');
    numbers[index] = newValue;
    const ip = numbers.join('.');
    this.handleValueChange(ip, true, newValue);
  }

  handleValueChange = (ip, isEdit, newValue) => {
    const { onChange } = this.props;
    const isValid = !isEdit || this.checkValue(newValue, ip);
    if (onChange) {
      onChange({
        value: ip,
        isEdit,
        valid: isValid,
      });
    }
  }

  checkValue = (value, ip) => {
    if (!this.isInterger(value)) {
      return false;
    }
    const { min = 2, max = 254, useds = [] } = this.props;
    if (!this.isRange(value, min, max)) {
      return false;
    }
    return this.isNotUsed(ip, useds);
  }

  checkIPv4 = ipv4 => ipv4.every(this.isInteger);

  isInterger = number => positiveIntegerRegex.test(number);

  isRange = (value, min, max) => value >= min && value <= max;

  isNotUsed = (value, useds) => useds.indexOf(value) < 0;

  renderInput() {
    const numbers = this.state.value.split('/')[0].split('.');
    const items = numbers.map((it, numberIndex) => {
      const disabled = numberIndex < numbers.length - 1;
      const dot = disabled ? <span className={styles['ip-dot']}>·</span> : null;
      return (
        <div className={styles['ip-item']}
          key={numberIndex.toString()}
          onClick={e => {
            if (e && e.stopPropagation) {
              e.stopPropagation();
            }
          }}>
          <Input min={1} max={255} defaultValue={it}
            disabled={disabled}
            className={styles.input}
            onChange={newValue => {
              this.handleInputChange(newValue.target.value, numberIndex);
            }} />
          {dot}
        </div>
      )
    });
    return items;
  }

  render() {
    const { canEdit = false, tooltip = '' } = this.props;
    const { isEdit } = this.state;
    const button = canEdit ? <Button type="primary" size="small" onClick={this.handleClick}>指定IP</Button> : null;
    if (!isEdit) {
      return (
        <div className={styles.wrapper}>
          <span>{this.props.poolValue}</span>
          {button}
        </div>
      );
    }

    const inputItems = this.renderInput();

    return (
      <div className={styles.wrapper}>
        <Tooltip title={tooltip}>
          {inputItems}
          <Button type="link"
            size="small"
            onClick={() => { this.handleEditVisible(false) }}>
            <Icon type="rollback" />
          </Button>
        </Tooltip>
      </div>
    )
  }
}
