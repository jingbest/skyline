import React, { useState } from 'react';
import { Form, Input, Radio } from 'antd';
import ButtonChecks from '@/components/FormItem/ButtonChecks';
import IconRadios from '@/components/FormItem/IconRadios';
import Slider from '@/components/FormItem/Slider';

const FormItem = Form.Item;

export default function ActionFormItem(props) {
  const { id, type, form, labelCol = 5, wrapperCol = 19, label = '',
    rules = [], onChange = null, placeholder = '', initialValue = null } = props;
  switch (type) {
    case 'select':
      return null;
    case 'button-checks': {
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
          {form.getFieldDecorator(id, {
            rules,
            initialValue,
          })(<ButtonChecks {...props}>
          </ButtonChecks>)}
        </FormItem>
      );
    }
    case 'icon-radios': {
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
          {form.getFieldDecorator(id, {
            rules,
            initialValue,
          })(<IconRadios {...props}>
          </IconRadios>)}
        </FormItem>
      );
    }
    case 'slider': {
      // const [validateStatus, setValidateStatus] = useState('success');
      // const onValueChange = (value, valid) => {
      //   console.log('action form item', 'valid', valid);
      //   const result = valid ? 'success' : 'error';
      //   setValidateStatus(result);
      // }
      return (
        <FormItem
          // validateStatus={validateStatus || 'success'}
          // help={props.help || ''}
          key={id}
          labelCol={{
            span: labelCol,
          }}
          wrapperCol={{
            span: wrapperCol,
          }}
          label={label}
        >
          {form.getFieldDecorator(id, {
            rules,
            initialValue,
          })(<Slider {...props}>
          </Slider>)}
        </FormItem>
      );
    }
    case 'radio': {
      const { titleMap = [], className } = props;
      const items = titleMap.map(it => (
        <Radio.Button value={it.value} key={it.value}>{it.name}</Radio.Button>
      ))
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
          {form.getFieldDecorator(id, {
            rules,
            initialValue,
          })(<Radio.Group onChange={onChange} className={className}>
            {items}
          </Radio.Group>)}
        </FormItem>
      );
    }
    default: {
      const { onChange } = props;
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
          {form.getFieldDecorator(id, {
            rules,
            initialValue,
          })(<Input placeholder={placeholder} onChange={onChange}/>)}
        </FormItem>
      )
    }
  }
}
