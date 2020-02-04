import React, { PureComponent } from 'react';
import styles from './index.css';

function ButtonItem(props) {
  const { iconName = '', value, name, isSelected = false, onClick } = props;
  return (
    <div
      className={isSelected ? `${styles.item} ${styles.active}` : styles.item}
      onClick={() => {
        if (onClick) {
          onClick(value);
        }
      }}>
      <div className={styles['image-wrapper']}>
        <div className={`${styles['image-icons']} ${styles[iconName]} ${styles.active}`}>
          {/* <span className={styles.icon}></span> */}
        </div>
      </div>

      <span className={styles.name}>{name}</span>
    </div>
  );
}

export default class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.value,
    }
  }

  isSelected = value => this.state.selectedValue === value;

  // initValue = value => {
  //   const item = this.props.titleMap.find(it => it.value === value);
  //   if (item) {
  //     return item.value;
  //   }
  //   return null;
  // }

  handleClick = value => {
    this.setState(() => ({
      selectedValue: value,
    }), () => {
      this.handleChange(this.state.selectedValue);
    });
  }

  handleChange = newValue => {
    const item = this.props.titleMap.find(it => (it.value === newValue));
    const { onChange } = this.props;
    if (onChange) {
      onChange(newValue, item);
    }
  }

  render() {
    const { titleMap = [], icon = null } = this.props;
    const items = titleMap.map(it => (
      <ButtonItem key={it.value} {...it} icon={it.icon || icon}
        isSelected={this.isSelected(it.value)}
        onClick={this.handleClick} />
    ));
    return (
      <div className={styles.wrapper}>
        {items}
      </div>
    );
  }
}
