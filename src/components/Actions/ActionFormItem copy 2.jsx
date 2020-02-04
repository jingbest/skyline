import React, { useState } from 'react';
import { Form, Input, Radio } from 'antd';
import ButtonChecks from '@/components/FormItem/ButtonChecks';
import IconRadios from '@/components/FormItem/IconRadios';
import Slider from '@/components/FormItem/Slider';
// import RadioButtons from '@/components/FormItem/RadioButtons';

const FormItem = Form.Item;

export default function ActionFormItem(props) {
  const { id, type, form, labelCol = 5, wrapperCol = 19, label = '',
    rules = [], onChange = null, placeholder = '', initialValue = null } = props;
  let component;
  let conf = {
    rules,
    initialValue,
  };
  const handleChange = value => {
    if (onChange) {
      onChange(value, form);
    }
  }
  let newProps = {
    ...props,
    onChange: handleChange,
  }
  switch (type) {
    case 'select':
      return null;
    case 'button-checks': {
      component = <ButtonChecks {...newProps} />;
      break;
    }
    case 'icon-radios': {
      component = <IconRadios {...newProps} />;
      break;
    }
    case 'slider': {
      component = <Slider {...newProps} />;
      break;
    }
    case 'radio-buttons': {
      const { titleMap = [], className } = props;
      const items = titleMap.map(it => (
        <Radio.Button value={it.value} key={it.value}>{it.name}</Radio.Button>
      ))
      component = <Radio.Group onChange={newProps.handleChange} className={className}>
        {items}
      </Radio.Group>
      break;
    }
    default: {
      conf = {
        rules,
      }
      component = <Input placeholder={placeholder} onChange={newProps.handleChange} required/>;
    }
  }
  return (
    <FormItem
      key={id}
      labelCol={{
        span: labelCol,
      }}
      wrapperCol={{
        span: wrapperCol,
      }}
      label={label}
    >
      {form.getFieldDecorator(id, conf)(component)}
    </FormItem>
  )
}
