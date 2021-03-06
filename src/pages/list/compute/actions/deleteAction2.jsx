import { gettext } from 'ttag';

const allowed = item => true;

const perform = item => {
  const onSubmit = () => false;
  const labels = {
    title: 'delete',
  };

  return {
    onSubmit,
    labels,
  }
}

const config = {
  id: 'delete2',
  name: 'delete2',
  buttonType: 'danger',
  allowed,
  perform,
  confirm: true,
}

export default config;
