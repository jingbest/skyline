import React, { PureComponent } from 'react';
import { Form, Input, Radio, Select, InputNumber } from 'antd';
import ButtonChecks from './ButtonChecks';
import IconRadios from './IconRadios';
import SliderInput from './SliderInput';
import SubnetSelect from './SubnetSelect';
import IconText from './IconText';

export default class FormItem extends PureComponent {
  constructor(props) {
    super(props);
    const { dataLoad } = this.props;
    this.state = {
      loading: !!dataLoad,
    }
  }

  // static getDerivedStateFromProps(props) {
  //   const { dataLoadKeys = [] } = props;
  //   if (dataLoadKeys.length > 0) {
  //     const result = {}
  //     dataLoadKeys.forEach(key => {
  //       result[key] = props[key];
  //     });
  //     return result;
  //   }
  //   return null;
  // }

  // todo: dataLoad still not ok!
  async componentDidMount() {
    const { dataLoad } = this.props;
    if (dataLoad) {
      const result = await dataLoad();
      result.forEach(it => {
        this.setState({
          [it.key]: it.value,
        })
      })
      this.setState({
        loading: false,
      });
    }
  }

  updateForm = values => {
    const { form, updateModel } = this.props;
    if (form) {
      form.setFieldsValue(values);
      Object.keys(values).forEach(key => {
        if (updateModel) {
          updateModel(key, values[key]);
        }
      })
    }
  }

  handleChange = (value, valueItem) => {
    const { onChange, form, model, id, updateModel } = this.props;
    const oldValue = model[id];
    const newValue = value && value.target ? value.target.value : value;
    if (updateModel) {
      updateModel(id, newValue);
    }
    if (onChange) {
      onChange({
        value: newValue,
        modelValue: model,
        oldValue,
        form,
        valueItem,
        callback: this.updateForm,
      });
    }
  }

  render() {
    const { id, type, form, labelCol = 6, wrapperCol = 18, label = '',
      rules = [], placeholder = '', initialValue = null, extra = '', visible = null } = this.props;
    const { loading = false } = this.state;
    let component;
    let conf = {
      rules,
      initialValue,
    };
    let itemContext = null;

    const newProps = {
      ...this.props,
      onChange: this.handleChange,
      loading,
      // ...this.state,
    };
    if (visible) {
      const visibleResult = visible();
      if (!visibleResult) {
        return null;
      }
    }
    switch (type) {
      case 'select': {
        const { Option } = Select;
        const { titleMap = [] } = this.props;
        const items = titleMap.map(it => (
          <Option value={it.value} key={it.value}>{it.name}</Option>
        ));
        component = <Select style={{ width: '100%' }} onChange={this.handleChange}>{items}</Select>;
        break;
      }
      case 'button-checks': {
        component = <ButtonChecks {...newProps} />;
        break;
      }
      case 'icon-radios': {
        component = <IconRadios {...newProps} />;
        break;
      }
      case 'slider': {
        component = <SliderInput {...newProps} />;
        break;
      }
      case 'radio-buttons': {
        const { titleMap = [], className } = this.props;
        const items = titleMap.map(it => (
          <Radio.Button value={it.value} key={it.value}>{it.name}</Radio.Button>
        ))
        component = <Radio.Group onChange={this.handleChange} className={className}>
          {items}
        </Radio.Group>
        break;
      }
      case 'subnet-select': {
        component = <SubnetSelect {...newProps} />;
        break;
      }
      case 'input': {
        component = <Input
          placeholder={placeholder}
          onChange={this.handleChange}
        />;
        break;
      }
      case 'input-password': {
        component = <Input.Password
          placeholder={placeholder}
          onChange={this.handleChange}
        />;
        break;
      }
      case 'input-number': {
        const { min = -Infinity, max = Infinity } = this.props;
        component = <InputNumber
          placeholder={placeholder}
          onChange={this.handleChange}
          min={min}
          max={max}
        />;
        break;
      }
      default: {
        const { icon = null } = this.props;
        component = <IconText
          icon={icon}
        />;
      }
    }
    const formItemProps = {
      key: id,
      labelCol: { span: labelCol },
      wrapperCol: { span: wrapperCol },
      label,
      extra,
    };
    if ('validateStatus' in this.props) {
      formItemProps.validateStatus = this.props.validateStatus;
    }
    if (!itemContext) {
      itemContext = form.getFieldDecorator(id, conf)(component);
    }

    return (
      <Form.Item
        {...formItemProps}
      >
        {itemContext}
      </Form.Item>
    )
  }
}
