import { gettext, t } from 'ttag';
import {
  getKeyPairs,
} from '../service';
import { passwordRegex } from '@/utils/regex';

// console.log(images);
const allowed = item => true;

const perform = item => {

  let keyPairs = [];
  const model = {
    loginType: 'password',
    username: 'root',
  }

  const loginTypeForm = {
    id: 'loginType',
    type: 'radio-buttons',
    label: gettext('Login Type'),
    titleMap: [
      {
        value: 'password',
        name: gettext('Password'),
      },
      {
        value: 'keyPair',
        name: gettext('Key Pair'),
      },
    ],
  };

  const usernameForm = {
    id: 'username',
    label: gettext('Username'),
  };

  const passwordTip = gettext(
    'Invalid: More than 8 less than 40 words within letter and number. ' +
    'At least one upper letter, one lower letter and one number.',
  );
  const confirmTip = gettext('Invalid: Password must be the same with confirm password.');
  const passwordForm = {
    id: 'password',
    type: 'input-password',
    label: gettext('Password'),
    // wrapperCol: 12,
    rules: [
      {
        required: true,
        pattern: passwordRegex,
        message: passwordTip,
      },
    ],
    visible: () => model.loginType === 'password',
  };

  const confirmForm = {
    id: 'confirm',
    type: 'input-password',
    label: gettext('Confirm Password'),
    // wrapperCol: 12,
    rules: [
      {
        required: true,
        message: confirmTip,
        validator: (rule, value, callback) => {
          if (value !== model.password) {
            callback(confirmTip);
          }
          callback();
        },
      },
    ],
    visible: () => model.loginType === 'password',
  };

  const keyPairForm = {
    id: 'keyPair',
    type: 'select',
    label: gettext('Key Pair'),
    titleMap: [],
    rules: [
      {
        required: true, message: 'Please select key pair',
      },
    ],
    emptyHint: gettext('no key pairs'),
    visible: () => model.loginType === 'keyPair',
  }


  const formItems = [
    loginTypeForm,
    usernameForm,
    passwordForm,
    confirmForm,
    keyPairForm,
  ];

  const onSubmit = values => {
    console.log(values);
    return false;
  }

  const config = {
    formItems,
    model,
    onSubmit,
    labels: {
      title: 'Security',
      success: 'success',
      error: 'failed',
    },
  };

  const onLoad = res => {
    keyPairs = res.items;
    const titleMap = keyPairs.map(it => ({
      value: it.id,
      name: it.name,
    }));
    keyPairForm.titleMap = titleMap;
    model.keyPair = titleMap[0].value || '';
    return config;
  }

  return getKeyPairs().then(onLoad);
};

const config = {
  allowed,
  perform,
  id: 'security',
  name: 'Security Config',
}

export default config;
