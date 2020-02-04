import React from 'react';
import { Icon } from 'antd';
import { gettext } from 'ttag';

const formItems = [
  {
    type: 'radio',
    label: gettext('Image Type'),
    name: 'image',
    initialValue: 'public',
    id: 'image',
    titleMap: [
      { id: 1, value: 'public', name: gettext('Public') },
      { id: 2, value: 'share', name: gettext('Share') },
      { id: 3, value: 'private', name: gettext('Private') },
    ],
  },
  {
    type: 'icon-radios',
    label: gettext('Image System'),
    name: 'system',
    initialValue: 'centos',
    id: 'system',
    titleMap: [
      {
        id: 1, value: 'centos', name: 'CentOs', iconName: 'centos',
      },
      { id: 2, value: 'ubuntu', name: gettext('Ubuntu'), iconName: 'ubuntu' },
      { id: 3, value: 'fedora', name: gettext('Fedora'), iconName: 'fedora' },
      { id: 4, value: 'windows', name: gettext('Windows'), iconName: 'windows' },
      { id: 5, value: 'debian', name: gettext('Debian'), iconName: 'debian' },
      { id: 6, value: 'coreos', name: gettext('CoreOS'), iconName: 'coreos' },
      { id: 7, value: 'arch', name: gettext('Arch'), iconName: 'arch' },
      { id: 8, value: 'freebsd', name: gettext('FreeBSD'), iconName: 'freebsd' },
      { id: 9, value: 'other', name: gettext('Other'), iconName: 'other' },
    ],
  },
  {
    type: 'button-checks',
    label: 'name',
    id: 'name',
    rules: [
      {
        required: true,
        message: '请输入至少五个字符的规则描述！',
      },
    ],
    titleMap: [
      { id: 1, value: 1, name: 'name1' },
      { id: 2, value: 2, name: 'name2' },
      { id: 3, value: 3, name: 'name3' },
      { id: 4, value: 4, name: 'name4' },
      { id: 5, value: 5, name: 'name5' },
      { id: 6, value: 6, name: 'name6' },
    ],
    onChange: value => {
      console.log(value);
    },
    isMulti: true,
    icon: <Icon type="apartment" />,
    initialValue: [{ id: 2 }, { id: 1 }],
  },
];

export const imageStep = {
  title: 'Image Type',
  formItems,
};
