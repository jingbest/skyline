import React from 'react';
import { Descriptions, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import { gettext } from 'ttag';
import updateKey from '@/utils/updateKey';

const infoItem = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.node,
});

InfoCard.propTypes = {
  infoItems: PropTypes.arrayOf(infoItem),
  title: PropTypes.string,
}

InfoCard.defaultProps = {
  infoItems: [],
  title: gettext('Basic Info'),
}

function InfoItem(props) {
  const { label, value } = props;
  return (
    <Row>
      <Col span={8} className={styles.label}>{label}</Col>
      <Col span={16} className={styles.value}>{value}</Col>
    </Row>
  )
}

export default function InfoCard(props) {
  const { title, infoItems } = props;
  const items = infoItems.map(it => (
    <InfoItem {...it} key={`info-item-${updateKey()}`}/>
  ));
  const newTitle = `${title}:`;
  return (
    <div className={styles.card}>
      <h1>{newTitle}</h1>
      {items}
    </div>
  );
}
