import { gettext } from 'ttag';
import { nameMessage } from '@/utils/messages';

const allowed = item => true;

const perform = item => {
  const model = {
    name: '',
    count: 1,
  };

  const nameForm = {
    id: 'name',
    type: 'input',
    label: gettext('Name'),
    rules: [
      {
        required: true,
        partten: /^[a-zA-Z\u4e00-\u9fa5][\u4e00-\u9fa5\u0022\w\[\]'^<>.:()_-]{0,127}$/,
        message: nameMessage,
      },
    ],
  };

  const countForm = {
    id: 'count',
    type: 'input-number',
    label: gettext('Quantity'),
    min: 1,
    max: 100,
    rules: [
      {
        required: true,
        message: gettext('Invalid: The number is between 1 and 100.'),
      },
    ],
  }

  const formItems = [
    nameForm,
    countForm,
  ];

  const onSubmit = values => {
    console.log(values);
    return true;
  }

  return {
    formItems,
    model,
    onSubmit,
    labels: {
      title: 'Base Info',
      success: 'success',
      error: 'failed',
    },
  }
}


const config = {
  allowed,
  perform,
  id: 'baseInfo',
  name: 'Base Info',
}

export default config;
