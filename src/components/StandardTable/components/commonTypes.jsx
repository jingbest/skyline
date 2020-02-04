import PropTypes from 'prop-types'

const tableAction = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  item: PropTypes.object,
  formItems: PropTypes.array,
  confirm: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.string,
  allowed: PropTypes.func,
  onSubmit: PropTypes.func,
  submitSuccessMsg: PropTypes.string,
  submitErrorMsg: PropTypes.string,
  alertMsg: PropTypes.string,
});

const actionConfFunc = PropTypes.func;

const editAction = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  columnId: PropTypes.string,
  allowed: PropTypes.func,
  onSubmit: PropTypes.func,
  submitSuccessMsg: PropTypes.string,
  submitErrorMsg: PropTypes.string,
  alertMsg: PropTypes.string,
});

export default {
  tableAction,
  editAction,
  actionConfFunc,
  tableActions: PropTypes.arrayOf(tableAction),
  editActions: PropTypes.arrayOf(editAction),
  rowActionsConfig: PropTypes.shape({
    firstAction: tableAction,
    moreActions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      actions: PropTypes.arrayOf(tableAction),
      action: tableAction,
    })),
  }),
  editActionsConfig: PropTypes.shape({
    ...tableAction,
  }),
  number: PropTypes.number,
  service: PropTypes.func,
}
