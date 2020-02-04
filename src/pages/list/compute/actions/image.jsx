import { gettext } from 'ttag';
import { getImages } from '../service';

// console.log(images);
const allowed = item => {
  return true;
};

const perform = item => {
  let imageForm;
  let imagesItems = [];
  const model = {
    visible: 'public',
    system: 'centos',
  }

  const onChangeImageType = ({ value, callback }) => {
    const titleMap = imagesItems.filter(it => it.os_distro === value).map(it => {
      return {
        value: it.id,
        name: it.name,
      }
    });
    imageForm.titleMap = titleMap || [];
    if (callback) {
      callback({
        image: titleMap && titleMap.length > 0 ? [titleMap[0].value] : undefined,
      });
    } else {
      model.image = [titleMap[0].value];
    }
  }

  const visibleForm = {
    type: 'radio-buttons',
    label: gettext('Image Type'),
    name: 'visible',
    id: 'visible',
    titleMap: [
      { value: 'public', name: gettext('Public') },
      { value: 'shared', name: gettext('Shared') },
      { value: 'private', name: gettext('Private') },
    ],
  };

  const imageTypeForm = {
    type: 'icon-radios',
    label: gettext('Image System'),
    name: 'system',
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
    onChange: onChangeImageType,
  };

  imageForm = {
    id: 'image',
    type: 'button-checks',
    label: gettext('Image System'),
    name: 'image',
    titleMap: [],
    emptyHint: 'no images',
    rules: [
      {
        required: true, message: 'Please select image',
      },
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
    model,
    formItems,
    onSubmit,
    labels: {
      title: 'Select Image',
      success: 'success',
      error: 'failed',
    },
  };

  const onLoad = res => {
    imagesItems = res.items.map(it => {
      return {
        ...it,
        user_type: it.properties.usage_type,
      }
    });
    onChangeImageType({
      value: imageTypeForm.titleMap[0].value,
    });
    return config;
  }

  return getImages().then(onLoad);
  // return config;
};

const config = {
  allowed,
  perform,
  id: 'image-select',
  name: 'Image',
}

export default config;
