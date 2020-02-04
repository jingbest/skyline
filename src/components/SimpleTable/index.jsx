import React from 'react';
import { Table } from 'antd';
import updateKey from '@/utils/updateKey';

export default function index(props) {
  const { columns, dataSource } = props;
  const datas = dataSource.map(it => {
    if (it.key) {
      return it;
    }
    const newIt = Object.assign({}, it);
    newIt.key = it.id || `data-${updateKey()}`;
    return newIt;
  })
  return (
    <Table
      columns={columns}
      dataSource={datas}
      pagination={false}
    >
    </Table>
  )
}
