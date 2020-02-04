import { gettext } from 'ttag';

const allowed = item => {
  return false;
};

const perform = item => {
  const formItems = [
    {
      type: 'input',
      label: gettext('name'),
      name: 'name',
      placeholder: gettext('please input'),
      id: 'name',
      rules: [
        {
          required: true,
          message: '请输入至少五个字符的规则描述！',
          min: 5,
        },
      ],
    },
  ];
  const onSubmit = values => {
    console.log(values);
    return false;
  }

  const config = {
    formItems,
    onSubmit,
    labels: {
      title: 'action9',
      success: 'success',
      error: 'failed',
    },
  };

  return config;
};

const config = {
  allowed,
  perform,
  id: 'action9',
  name: 'action9',
}

export default config;
