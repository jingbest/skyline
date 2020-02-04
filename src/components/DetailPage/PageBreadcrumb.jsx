import React from 'react';
import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import updateKey from '@/utils/updateKey';

const breadcrumbItem = PropTypes.shape({
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  isLink: PropTypes.bool,
});

PageBreadcrumb.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(breadcrumbItem),
}

PageBreadcrumb.defaultProps = {
  breadcrumbItems: [],
}

export default function PageBreadcrumb(props) {
  const { breadcrumbItems } = props;
  if (breadcrumbItems.length === 0) {
    return null;
  }
  const items = breadcrumbItems.map(it => {
    const key = it.id || `breadcrumb-${updateKey()}`;
    if (it.isLink) {
      return (
        <Breadcrumb.Item key={key}>
          <Link to={it.path}>{it.title}</Link>
        </Breadcrumb.Item>
      )
    }
    return (
      <Breadcrumb.Item key={key}>{it.title}</Breadcrumb.Item>
    )
  });
  return (
    <Breadcrumb>
      {items}
    </Breadcrumb>
  )
}
