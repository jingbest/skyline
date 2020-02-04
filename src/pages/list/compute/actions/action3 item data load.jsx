import { gettext } from 'ttag';
import { getImages } from '../service';
import { images } from '../_mock.data';

// console.log(images);
const allowed = item => {
  return true;
};

const perform = item => {

  let imageForm;
  // const imagesItems = images.items;
  let imagesItems = [];
  const model = {
    visible: 'public',
    system: 'centos',
  }

  const onChangeImageType = (type, form) => {
    const titleMap = imagesItems.filter(it => it.os_distro === type).map(it => {
      return {
        value: it.id,
        name: it.name,
      }
    });
    imageForm.titleMap = titleMap || [];
    if (form) {
      form.setFieldsValue({
        image: titleMap && titleMap.length > 0 ? [titleMap[0].value] : undefined,
      });
    } else {
      imageForm.initialValue = [titleMap[0].value];
    }
    return titleMap;
  }

  const visibleForm = {
    type: 'radio-buttons',
    label: gettext('Image Type'),
    name: 'visible',
    initialValue: 'public',
    id: 'visible',
    options: [
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
    options: [
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
    initialValue: 'centos',
    onChange: onChangeImageType,
  };

  const onLoad = res => {
    imagesItems = res.items.map(it => {
      return {
        ...it,
        user_type: it.properties.usage_type,
      }
    });
    onChangeImageType(imageTypeForm.options[0].value);
    return config;
    // const titleMap = onChangeImageType(imageTypeForm.options[0].value);
    // return [{
    //   key: 'titleMap',
    //   value: titleMap,
    // }, {
    //   key: 'initialValue',
    //   value: titleMap[0].value,
    // }];
  }

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
    // dataLoad: () => getImages().then(onLoad),
    // dataLoadKeys: ['titleMap'],
  };

  const inputForm = {
    id: 'name',
    type: 'input',
    name: 'name',
    placeholder: 'please input',
    rules: [{
      required: true,
    },
    ],
  };

  const formItems = [
    visibleForm,
    imageTypeForm,
    imageForm,
    // inputForm,
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
      title: 'action3',
      success: 'success',
      error: 'failed',
    },
  };

  return getImages().then(onLoad);
  return config;
};

const config = {
  allowed,
  perform,
  id: 'action3',
  name: 'action3',
}

export default config;
