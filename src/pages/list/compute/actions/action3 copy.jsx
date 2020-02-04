import { gettext } from 'ttag';
import { getImages } from '../service';

const allowed = item => {
  return true;
};

const perform = async item => {

  let images;

  const onChangeImageType = (type, form) => {
    const titleMap = images.filter(it => it.usage_type === type).map(it => {
      return {
        value: it.id,
        name: it.name,
      }
    });
    return titleMap;
  }

  const visibleForm = {
    type: 'radio',
    label: gettext('Image Type'),
    name: 'image',
    initialValue: 'public',
    id: 'image',
    options: [
      { value: 'public', name: gettext('Public') },
      { value: 'shared', name: gettext('Shared') },
      { value: 'private', name: gettext('Private') },
    ],
    onChange: onChangeImageType,
  };

  const imageForm = {
    type: 'button-checks',
    label: gettext('Image System'),
    name: 'system',
    titleMap: onChangeImageType('centos'),
  };

  const imageTypeForm = {
    type: 'icon-radios',
    label: gettext('Image System'),
    name: 'system',
    initialValue: 'centos',
    id: 'system',
    titleMap: [
      {
        value: 'centos', name: 'CentOs', iconName: 'centos',
      },
      { value: 'ubuntu', name: gettext('Ubuntu'), iconName: 'ubuntu' },
      { value: 'fedora', name: gettext('Fedora'), iconName: 'fedora' },
      { value: 'windows', name: gettext('Windows'), iconName: 'windows' },
      { value: 'debian', name: gettext('Debian'), iconName: 'debian' },
      { value: 'coreos', name: gettext('CoreOS'), iconName: 'coreos' },
      { value: 'arch', name: gettext('Arch'), iconName: 'arch' },
      { value: 'freebsd', name: gettext('FreeBSD'), iconName: 'freebsd' },
      { value: 'other', name: gettext('Other'), iconName: 'other' },
    ],
  };

  const formItems = [
    visibleForm,
    imageTypeForm,
    imageForm,
  ];

  const onSubmit = values => {
    console.log(values);
    return false;
  }

  const config = {
    formItems,
    onSubmit,
    labels: {
      title: 'action3',
      success: 'success',
      error: 'failed',
    },
  };

  const onLoad = res => {
    images = res.items.map(it => {
      return {
        ...it,
        user_type: it.properties.usage_type,
      }
    });
    return config;
  }

  await getImages().then(onLoad);
};

const config = {
  allowed,
  perform,
  id: 'action3',
  name: 'action3',
}

export default config;
