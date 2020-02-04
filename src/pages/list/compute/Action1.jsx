import React, { PureComponent } from 'react';
import TableAction from '@/components/Actions/TableAction';

export default class Action1 extends PureComponent {
  render() {
    return (
      <TableAction
        title="action1-title"
        name="action1-name"
        item={this.props.item}
        allowed
        form
        callback={this.props.freshData}
        onSubmit={this.onSubmit}
      />
    )
  }
}
