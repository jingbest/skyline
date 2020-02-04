import { gettext } from 'ttag';

export function getCreateActionConfig2() {
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
  const handleSubmit = values => {
    console.log(values);
    return false;
  }

  const allowed = data => {
    return true;
  }

  const config = {
    title: 'create2',
    buttonType: 'primary',
    formItems,
    onSubmit: handleSubmit,
    allowed,
    id: 'create2',
    name: 'create2',
    isStep: false,
  };

  return config;
}
