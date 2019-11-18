import React from 'react'
import { Icon } from 'antd'
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less'

export default function index(props) {
  const { messageId } = props;
  const iconType = props.iconType || 'info-circle';
  const theme = props.theme || 'filled';
  const message = props.message || (messageId && formatMessage({
    id: messageId,
  }));
  return (

    <div style={{ marginBottom: '2px' }}>
      <Icon type={iconType} theme={theme} className={styles.icon} />
      <span className={styles.message}>{message}</span>
    </div>
  );
}
