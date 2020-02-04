import { gettext } from 'ttag';
import { updateName } from '../service';

export default function editActionConfig(initialValue, item) {

  const onSubmit = (values, record) => {
    const data = {
      name: values.name,
      id: record.id,
    }
    updateName(data).then(res => {
      console.log(res);
    })
  }

  const allowed = () => {
    return true;
  }

  return {
    item,
    initialValue,
    title: gettext('Edit Name'),
    label: gettext('name'),
    placeholder: gettext('Please input name'),
    id: 'name',
    onSubmit,
    allowed,
    submitSuccess: 'success',
    submitError: 'error',
  }
}
