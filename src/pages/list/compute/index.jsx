import {
  Badge,
  Card,
  Divider,
  Form,
  Select,
  message,
} from 'antd';
import Link from 'umi/link';
import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
// import CreateForm from './components/CreateForm';
import StandardTable from '@/components/StandardTable';
// import UpdateForm from './components/UpdateForm';
import styles from './style.less';
import { getDataList } from './service';
import notification from '@/components/notification'
// import Action3 from './actions/action3';
import Action4 from './actions/action4';
import Action5 from './actions/action5';
import Action6 from './actions/action6';
import Action7 from './actions/action7';
import TableEditItem from '@/components/Actions/TableEditItem';
import Avatar from '@/components/GlobalHeader/AvatarDropdown';
import column from './column';
import { t, jt } from 'ttag';
import actionConfigs from './actions';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

class SkylineTable extends Component {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  componentDidMount() {
    // notification.success('ssss');
    // notification.success('ssss');
    // notification.success('ssss');
    // notification.success('ssss');
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'listSkylineTable/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'listSkylineTable/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'listSkylineTable/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;

      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'listSkylineTable/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listSkylineTable/add',
      payload: {
        desc: fields.desc,
      },
    });
    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listSkylineTable/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });
    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  render() {
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const { rowActionsConfig, primaryActions, batchActions } = actionConfigs;
    // const primaryActions = [{
    //   type: 'primary',
    //   icon: 'plus',
    //   name: '新建',
    //   id: 'new',
    //   onClick: () => {
    //     console.log('primaryActions')
    //   },
    // }];
    // const batchActions = [{
    //   type: 'danger',
    //   name: '删除',
    //   id: 'delete',
    //   onClick: () => {
    //     console.log('batchActions')
    //   },
    // }, {
    //   type: 'danger',
    //   name: '删除2',
    //   id: 'delete2',
    //   onClick: () => {
    //     console.log('batchActions2')
    //   },
    //   // }, {
    //   //   type: 'danger',
    //   //   name: '删除3',
    //   //   id: 'delete3',
    //   //   onClick: () => {
    //   //     console.log('batchActions3')
    //   //   },
    //   // }, {
    //   //   type: 'danger',
    //   //   name: '删除4',
    //   //   id: 'delete4',
    //   //   onClick: () => {
    //   //     console.log('batchActions4')
    //   //   },
    // }];
    return (
      <PageHeaderWrapper title={false}>
        {/* <TableEditItem context="abc" key="edit" />
        <Action4></Action4>
        <Action5 />
        <Action6></Action6>
        <Action7></Action7>
        <span key="btn-trans">{t`me`}</span>
        <Link to={{
          pathname: '/list/compute/detail/1',
          query: { name: 'fdsa' },
        }} >detail</Link> */}
        <div className={styles.tableList}>
          <StandardTable
            // pageByServer={false}
            selectedRows={selectedRows}
            // loading={loading}
            // data={data}
            columns={column}
            // onSelectRow={this.handleSelectRows}
            // onChange={this.handleStandardTableChange}
            // primaryActions={primaryActions}
            // batchActions={batchActions}
            actionConfigs={actionConfigs}
            dataService={getDataList}
            extraParams={{ haha: true }}
          />
        </div>
        {/* <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null} */}
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(SkylineTable);
