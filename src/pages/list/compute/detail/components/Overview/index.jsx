import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import InfoCard from '@/components/InfoCard';
import CardTablePage from '@/components/CardTablePage';
import PageTabs from '@/components/PageTabs';
import VolumnTable from './VolumnTable';

export default class index extends PureComponent {

  componentDidMount() {
    console.log(this.props);
  }

  getInfoItems = res => {
    const keyList = ['name', 'uuid', 'network', 'ip', 'image', 'config', 'volume'];
  }

  render() {
    const { item } = this.props;
    const infoItems = [
      {
        label: '名称',
        value: 'viki',
      },
      {
        label: 'uuid',
        value: '111',
      },
    ];
    const cardInfo = {
      infoItems,
    }
    const tabs = [
      {
        title: 'Volumn',
        id: 'Volumn',
        children: <VolumnTable item={item} />,
      },
      {
        title: 'Floating Ip',
        id: 'flaoting-ip',
        children: <h1>Floating Ip</h1>,
      },
      {
        title: 'NIC',
        id: 'nic',
        children: <h1>NIC</h1>,
      },
      {
        title: '安全组',
        id: 'group',
        children: <h1>安全组</h1>,
      },
      {
        title: '快照',
        id: 'shot',
        children: <h1>快照</h1>,
      },
      {
        title: '备份',
        id: 'backend',
        children: <h1>备份</h1>,
      },
    ];
    const rightContent = (
      <PageTabs tabItems={tabs} isPage={false}/>
    )
    return (
      <CardTablePage cardInfo={cardInfo} rightContent={rightContent}/>
    )
  }
}
