import { gettext } from 'ttag';


export function getConsoleConfig(item) {

  const handleSubmit = values => {
    console.log(values);
    return false;
  }

  const allowed = () => {
    if (item.id % 5 === 1) {
      return true;
    }
    return false;
  }

  const config = {
    title: '跳转到控制台',
    confirm: true,
    confirmMessage: '您确定要直接跳转到控制台吗？控制台稍后会在新页面中打开。',
    onSubmit: handleSubmit,
    allowed,
    canHide: false,
    id: 'action-console',
    name: 'action-console',
  };

  return config;
}
