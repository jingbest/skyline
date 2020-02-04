import React, { PureComponent } from 'react';
import DetailPage from '@/components/DetailPage';
import { gettext } from 'ttag';
import Overview from './components/Overview';
import { getData } from '../service';
import Logs from './components/Logs';


export default class index extends PureComponent {

  constructor(props) {
    super(props);
    const { match, location } = this.props;
    const { state: { item } } = location;
    const itemId = match.params.id;
    this.state = {
      item,
      itemId,
    };
  }

  async componentDidMount() {
    const item = await getData();
    this.setState({
      item,
    });
  }

  render() {
    const { item, itemId } = this.state;
    const breadcrumbItems = [
      {
        title: gettext('list'),
      },
      {
        title: gettext('Compute'),
        path: '/list/compute',
        isLink: true,
      },
      {
        title: `${item.name}${gettext('detail')}`,
      },
    ];
    const tabItems = [
      {
        title: gettext('Overview'),
        id: 'overview',
        children: <Overview itemId={itemId} item={item} />,
      },
      {
        title: gettext('Logs'),
        id: 'logs',
        children: <Logs item={item}/>,
      },
    ]
    return (
      <DetailPage
        breadcrumbItems={breadcrumbItems}
        tabItems={tabItems}
      >
      </DetailPage>
    )
  }
}
