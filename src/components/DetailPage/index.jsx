import React, { PureComponent } from 'react';
import PageBreadcrumb from './PageBreadcrumb';
import PageTabs from '../PageTabs';
import styles from './index.less';

export default class index extends PureComponent {
  static defaultProps = {
    breadcrumbItems: [],
    tabs: [],
  }

  render() {
    const { breadcrumbItems, tabItems } = this.props;
    const header = breadcrumbItems.length === 0 ? null :
    (
      <div className={tabItems.length > 0 ? `${styles.header} ${styles['has-tabs']}` : styles.header}>
        <PageBreadcrumb breadcrumbItems={breadcrumbItems}/>
        <PageTabs tabItems={tabItems}></PageTabs>
      </div>
    )

    return (
      <>
        {header}
        <div>
          {this.props.children}
        </div>
      </>
    )
  }
}
