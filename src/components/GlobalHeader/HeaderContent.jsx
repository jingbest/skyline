import React from 'react';
import RightContent from './RightContent';
import ProjectDropdown from './ProjectDropdown';
import styles from './index.less';

export default function HeaderContent(props) {
  return (
    <div className={styles.header}>
      <ProjectDropdown/>
      <RightContent {...props}/>
    </div>
  )
}
