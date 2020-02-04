import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import InfoCard from '../InfoCard';
import styles from './index.less';

export default class index extends PureComponent {
  render() {
    const { cardInfo, rightContent, content } = this.props;
    if (cardInfo) {
      return (
        <Row className={styles.main} gutter={[15]}>
          <Col span={6}>
            <div className={styles.left}>
              <InfoCard {...cardInfo}></InfoCard>
            </div>
          </Col>
          <Col span={18}>
            <div className={styles.right}>
              {rightContent}
            </div>
          </Col>
        </Row>
      )
    }
    return (
      <Row className={styles.main}>
        {content}
      </Row>
    )
  }
}
