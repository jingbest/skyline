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
  id: 'delete1',
  name: 'delete1',
  buttonType: 'danger',
  allowed,
  perform,
  confirm: true,
}

export default config;
