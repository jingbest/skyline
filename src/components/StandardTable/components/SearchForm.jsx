import React from 'react';
import { Button, Row, Col } from 'antd';
import TableActionButtons from './TableActionButtons';


SearchForm.defaultProps = {
  primaryActionConfs: [],
  batchActionConfs: [],
  selectedRowLength: 0,
}

export default function SearchForm(props) {
  const { primaryActionConfs, batchActionConfs, selectedItems, onFresh } = props;
  const showFreshButton = primaryActionConfs.length > 0 || batchActionConfs.length > 0;
  return (
    <Row type="flex" gutter={10} style={{ marginBottom: '16px' }}>
      {showFreshButton && <Col key="fresh"><Button icon="sync" type="primary"
        onClick={() => props.onFresh && props.onFresh()}>
      </Button></Col>}
      <TableActionButtons
        primaryActionConfs={primaryActionConfs}
        batchActionConfs={batchActionConfs}
        selectedItems={selectedItems}
        actionCallback={onFresh}
      />
    </Row>
  )
}
