import React, { PureComponent } from 'react';
import { Icon, Spin, Button } from 'antd';
import IpInput from '@/components/FormItem/IpInput';
import styles from './index.less';


function ButtonItem(props) {
  const { item = null, isSelected = false, onClick, handleIPInput, tooltip = '', usedIps = [] } = props;
  const { allocation_pools: { start = '', end = '' } } = item;
  const extraRender = (
    <div className={styles['ip-input']}>
      <IpInput
        useds={usedIps}
        min={start.split('.')[3]}
        max={end.split('.')[3]}
        poolValue={item.cidr}
        canEdit={isSelected}
        onChange={handleIPInput}
        tooltip={tooltip} />
    </div>

  );
  return (
    <div
      className={isSelected ? `${styles.item} ${styles.active}` : styles.item}
      onClick={e => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        if (onClick) {
          onClick(item.id);
        }
      }}>
      <span>{item.name}</span>
      {extraRender}
      {isSelected && (<span className={styles.right}>
        <Icon type="check" />
      </span>)}
    </div>
  );
}

export default class index extends PureComponent {
  constructor(props) {
    super(props);
    this.ipValue = {
      isEdit: false,
      value: '',
    };
    this.state = {
      value: props.value,
    }
  }

  static getDerivedStateFromProps(props) {
    const { value } = props;
    return {
      value,
    };
  }


  isSelected = value => this.state.value && this.state.value === value.id;

  handleClick = value => {
    this.setState({
      value,
    }, () => {
      this.handleChange(value);
    });
  }

  handleChange = value => {
    const { onChange, subnets = [] } = this.props;
    const item = subnets.find(it => it.id === value);
    if (onChange) {
      const newValueItem = {
        ...item,
        ipValue: this.ipValue,
      }
      onChange(value, newValueItem);
    }
  }

  handleIPInput = value => {
    console.log(value);
    this.ipValue = {
      ...value,
    };
    this.handleChange(this.state.value);
  }

  renderLoading = () => {
    const { loading = false } = this.props;
    if (loading) {
      return <Spin></Spin>;
    }
    return null;
  }

  renderEmpty = () => {
    const { emptyHint, subnets = [] } = this.props;
    if (subnets.length > 0) {
      return null;
    }
    return (<h4 className={styles['empty-item']}>
      {emptyHint}
    </h4>)
  }

  render() {
    const { subnets = [], tooltip = '', usedIps = [] } = this.props;
    const items = subnets.map(it => (
      <ButtonItem key={it.id} item={it}
        isSelected={this.isSelected(it)}
        onClick={this.handleClick}
        handleIPInput={this.handleIPInput}
        tooltip={tooltip}
        usedIps={usedIps}
      />
    ));
    const emptyHint = this.renderEmpty();
    const loading = this.renderLoading();
    return (
      <div className={styles.wrapper}>
        {loading}
        {items}
        {emptyHint}
      </div>
    );
  }
}
