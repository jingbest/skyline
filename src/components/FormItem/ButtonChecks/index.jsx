import React, { PureComponent } from 'react';
import { Icon, Spin } from 'antd';
import styles from './index.less';

function isEqual(arr1, arr2) {
  return JSON.stringify(arr1.sort()) === JSON.stringify((arr2.sort()))
}

function ButtonItem(props) {
  const { icon = '', value, name, isSelected = false, extra = null, onClick } = props;
  return (
    <div
      className={isSelected ? `${styles.item} ${styles.active}` : styles.item}
      onClick={() => {
        if (onClick) {
          onClick(value);
        }
      }}>
      {icon && (<span>{icon}</span>)}
      <span>{name}</span>
      <span className={styles.extra}>{extra}</span>
      {isSelected && (<span className={styles.right}>
        <Icon type="check" />
      </span>)}
    </div>
  );
}

export default class index extends PureComponent {

  state = {
    selectedValues: [],
  }

  static getDerivedStateFromProps(props, state) {
    const { value, titleMap } = props;
    if (!('value' in props)) {
      return null;
    }
    let newValue = value || [];
    if (!Array.isArray(newValue)) {
      newValue = [newValue];
    }
    // const oldValues = (state && state.selectedValues) || [];
    // if (isEqual(newValue, oldValues)) {
    //   return null;
    // }
    return {
      selectedValues: newValue,
    };
  }

  initValue = value => {
    let newValue = value || [];
    if (!Array.isArray(newValue)) {
      newValue = [newValue];
    } else {
      newValue = newValue.map(it => it.value);
    }
    return newValue;
  }

  isSelected = value => this.state.selectedValues.includes(value);

  handleClick = value => {
    if (this.isSelected(value)) {
      this.setState(previousState => ({
        selectedValues: previousState.selectedValues.filter(it => it !== value),
      }), () => {
        this.handleChange(this.state.selectedValues);
      });
    } else {
      const { isMulti } = this.props;
      if (this.state.selectedValues.length === 0 || !isMulti) {
        this.setState({
          selectedValues: [value],
        }, () => {
          this.handleChange(this.state.selectedValues);
        });
      } else {
        this.setState(previousState => ({
          selectedValues: [...previousState.selectedValues, value],
        }), () => {
          this.handleChange(this.state.selectedValues);
        });
      }
    }
  }

  handleChange = newValue => {
    const values = this.props.titleMap.filter(it => (newValue.includes(it.value)));
    const { onChange, isMulti } = this.props;
    if (onChange) {
      const data = isMulti ? newValue : newValue[0];
      const item = isMulti ? values : values[0];
      onChange(data, item);
    }
  }

  renderLoading = () => {
    const { loading = false } = this.props;
    if (loading) {
      return <Spin></Spin>;
    }
    return null;
  }

  renderEmpty = () => {
    const { emptyHint, titleMap } = this.props;
    if (titleMap.length > 0) {
      return null;
    }
    return (<h4 className={styles['empty-item']}>
      {emptyHint}
    </h4>)
  }

  render() {
    const { titleMap = [], icon = null } = this.props;
    const items = titleMap.map(it => (
      <ButtonItem key={it.value} {...it} icon={it.icon || icon}
        isSelected={this.isSelected(it.value)}
        onClick={this.handleClick} />
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
