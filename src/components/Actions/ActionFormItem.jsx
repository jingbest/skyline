import React, { PureComponent } from 'react';
import { Form, Input, Radio, Select } from 'antd';
import ButtonChecks from '@/components/FormItem/ButtonChecks';
import IconRadios from '@/components/FormItem/IconRadios';
import SliderInput from '@/components/FormItem/SliderInput';
import SubnetSelect from '@/components/FormItem/SubnetSelect';

// import RadioButtons from '@/components/FormItem/RadioButtons';

const FormItem = Form.Item;

export default class ActionFormItem extends PureComponent {
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

  handleChange = (value, valueItem) => {
    const { onChange, form } = this.props;
    if (value.target) {
      console.log(value.target);
    }
    const newValue = value.target ? value.target.value : value;
    if (onChange) {
      onChange(newValue, form, valueItem);
    }
  }

  render() {
    const { id, type, form, labelCol = 6, wrapperCol = 18, label = '',
      rules = [], placeholder = '', initialValue = null, extra = '' } = this.props;
    const { loading = false } = this.state;
    let component;
    let conf = {
      rules,
      initialValue,
    };

    const newProps = {
      ...this.props,
      onChange: this.handleChange,
      loading,
      // ...this.state,
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
      default: {
        conf = {
          rules,
        }
        component = <Input placeholder={placeholder} onChange={newProps.handleChange} required />;
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

    return (
      <FormItem
        {...formItemProps}
      >
        {form.getFieldDecorator(id, conf)(component)}
      </FormItem>
    )
  }
}
