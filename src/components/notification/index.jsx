import React from 'react';
import { notification, Icon } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';

export default {
  open(args) {
    const { title = formatMessage({
      id: 'action.notice.error',
    }), type = 'error' } = args;

    let iconType = 'close-circle';
    let iconColor = '#F5222D';

    if (type === 'info') {
      iconType = 'info-circle';
      iconColor = '#FAAD14';
    } else if (type === 'success') {
      iconType = 'check-circle';
      iconColor = '#52C41A';
    }

    const duration = type === 'error' ? 0 : 4.5;

    notification.open({
      message: title,
      // description: description || title,
      duration,
      icon: <Icon type={iconType} theme="filled" style={{ color: iconColor }} />,
    });
  },
  success(title) {
    this.open({
      title,
      type: 'success',
    })
  },
  error(title) {
    this.open({
      title,
      type: 'error',
    })
  },
};
