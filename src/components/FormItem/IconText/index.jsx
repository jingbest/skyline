import React, { PureComponent } from 'react'

export default class index extends PureComponent {
  state = {
    value: '',
  };

  static getDerivedStateFromProps(props) {
    const { value } = props;
    return {
      value,
    };
  }

  handleChange = newVal => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(newVal);
    }
  }

  render() {
    const { icon } = this.props;
    const { value } = this.state;
    const iconRender = <span style={{ marginRight: 8 }}>{icon}</span> || null;
    return (
      <div>
        {iconRender}
        <span>{value}</span>
      </div>
    )
  }
}
