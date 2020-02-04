import { gettext } from 'ttag';
import { imageStep } from './image';

const allowed = () => true;

const perform = () => {
  return {
    steps: [
      imageStep,
    ],
    stepTitles: [
      'image',
    ],
  }
}

const config = {
  allowed,
  perform,
  isStep: true,
  id: 'create',
  name: 'create',
}

export function getCreateActionConfig() {
  const step2Items = [
    {
      type: 'input',
      label: gettext('name2'),
      name: 'name2',
      placeholder: gettext('please input'),
      id: 'name2',
      rules: [
        {
          required: true,
          message: '请输入至少五个字符的规则描述！',
          min: 5,
        },
      ],
    },
  ];
//   const step1 = {
//     title: 'create1',
//     formItems: step1Items,
//     onSubmit: null,
//   };

  const step2 = {
    title: 'create2',
    formItems: step2Items,
    onSubmit: null,
  };
  const steps = [
    imageStep,
    step2,
  ]
  const handleSubmit = values => {
    console.log(values);
    return false;
  }

  const allowed = data => {
    return true;
  }

  const config = {
    title: 'create',
    buttonType: 'primary',
    steps,
    onSubmit: handleSubmit,
    allowed,
    id: 'create',
    name: 'create',
    isStep: true,
    rightContext: 'right',
    initialValues: {
      image: 'public',
      system: 'centos',
    },
  };

  return config;
}
