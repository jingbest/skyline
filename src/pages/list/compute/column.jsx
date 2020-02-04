import React from 'react';
import {
  Badge,
} from 'antd';
import moment from 'moment';
import Link from 'umi/link';
import constValues from './const';
import editActionConfig from './actions/editAction';
// const statusMap = ['default', 'processing', 'success', 'error'];
// const status = ['关闭', '运行中', '已上线', '异常'];

const { statusMap } = constValues;

export default [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    // editActionConfig,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: (val, item, index) => {
      return (
        <Link to={
          {
            pathname: `/list/compute/${val}`,
            state: {
              item,
            },
          }
        }>{val}</Link>
      );
    },
  },
  {
    title: '镜像',
    dataIndex: 'image',
    key: 'image',
    render: val => (val.os_distro),
  },
  {
    title: '内网IP',
    dataIndex: 'private_ip',
    key: 'private_ip',
    render: val => (val.length === 0 ? '-' : val[0].ip),
  },
  {
    title: '浮动IP',
    dataIndex: 'public_ip',
    key: 'public_ip',
    render: val => (!val || val.length === 0 ? '-' : val[0].ip),
  },
  // {
  //   title: '配置',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   align: 'right',
  //   key: 'callNo',
  //   // render: val => `${val} 万`,
  //   // mark to display a total number
  //   needTotal: true,
  // },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    filters: [
      {
        text: Object.keys(statusMap)[0],
        value: '0',
      },
      {
        text: Object.keys(statusMap)[1],
        value: '1',
      },
      {
        text: Object.keys(statusMap)[2],
        value: '2',
      },
      {
        text: Object.keys(statusMap)[3],
        value: '3',
      },
    ],

    // render(val) {
    //   return <Badge status={val} text={statusMap[val]} />;
    // },
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    key: 'created',
    sorter: true,
    render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
  },
];
