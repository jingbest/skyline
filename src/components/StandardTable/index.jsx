import { Table, notification, Icon, Card } from 'antd';
import React, { PureComponent } from 'react';
import SearchForm from './components/SearchForm';
import TableEditItem from '../Actions/TableEditItem';
import TableRowActionButtons from './components/TableRowActionButtons';
import styles from './index.less';
import updateKey from '@/utils/updateKey';

class StandardTable extends PureComponent {
  static defaultProps = {
    batchActions: [],
    dataService: undefined,
    extraParams: {},
    datas: [],
    canSelect: true,
    scrollX: 1300,
    actionConfs: {
      primaryActionConfs: [],
      batchActionConfs: [],
      rowActionConfs: {
        firstAction: null,
        moreActions: [],
      },
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      datasFromService: [],
      datas: props.datas,
      loading: false,
      params: props.extraParams ? { ...props.extraParams } : {},
      pagination: {
        total: 0,
        pageSize: 20,
        current: 1,
      },
    };
  }

  componentDidMount() {
    this.freshData();
  }


  freshData = () => {
    const { dataService, name } = this.props;
    if (!dataService) {
      return;
    }
    this.setState({
      loading: true,
    });
    if (dataService) {
      const params = {
        ...this.state.params,
        current: this.state.pagination.current,
        pageSize: this.state.pagination.pageSize,
      };
      dataService(params).then(response => {
        this.setState(prevState => {
          const newState = {
            loading: false,
            datasFromService: response.items,
            pagination: {
              ...prevState.pagination,
            },
          };
          if (response.pagination) {
            newState.pagination = {
              ...prevState.pagination,
              total: response.pagination.total,
              current: response.pagination.current,
            };
          }
          return newState;
        }, () => {
          this.freshDataByPage();
        });
      }, error => {
        this.setState({
          loading: false,
        });
        notification.open({
          message: `Get ${name} failed!`,
          description: error.message || `Get ${name} failed!`,
          icon: <Icon type="close-circle" theme="filled" style={{ color: '#F5222D' }} />,
        });
      })
    }
  }

  freshDataByPage = () => {
    const { pagination, datasFromService } = this.state;
    const datas = datasFromService.map(it => {
      const newIt = Object.assign({}, it);
      newIt.key = it.id ? it.id : `key-${updateKey()}`;
      return newIt;
    });
    const { pageByServer = true } = this.props;
    if (pageByServer) {
      this.setState({
        datas,
      });
    } else {
      pagination.total = datas.length;
      const beginIndex = ((pagination.current || 1) - 1) * pagination.pageSize;
      const newDatas = datas.slice(beginIndex, beginIndex + pagination.pageSize);
      this.setState({
        datas: newDatas,
        pagination,
      });
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const currySelectedRowKeys = selectedRowKeys;
    this.setState({
      selectedRows,
    });
    const { onSelectRow } = this.props;

    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({
      selectedRowKeys: currySelectedRowKeys,
    });
  };

  handleTableChange = (pagination, filters, sorter, ...rest) => {
    this.setState({
      pagination,
    }, () => {
      const { pageByServer = true } = this.props;
      if (pageByServer) {
        this.freshData();
      } else {
        this.freshDataByPage();
      }
    });
  };

  cleanSelectedKeys = () => {
    if (this.handleRowSelectChange) {
      this.handleRowSelectChange([], []);
    }
  };

  handleActionLoading = flag => {
    this.setState({
      loading: !!flag,
    });
  }

  render() {
    const { columns, actionConfigs = {
      primaryActionConfs: [],
      batchActionConfs: [],
      rowActionConfs: {
        firstAction: null,
        moreActions: [],
      },
    }, canSelect, scrollX, ...rest } = this.props;
    const { datas = [], pagination = false, loading = false,
      selectedRowKeys, selectedRows } = this.state;
    const paginationProps = this.state.pagination
      ? {
        showSizeChanger: true,
        ...pagination,
      }
      : false;
    const { primaryActionConfs, batchActionConfs, rowActionConfigs } = actionConfigs;
    const rowSelection = canSelect ? {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    } : null;
    const newColumns = [...columns].map(it => {
      if (it.editActionConfig) {
        return {
          ...it,
          render: (text, record) => {
            const config = it.editActionConfig(text, record);
            return <TableEditItem {...config} />;
          },
        }
      }
      return it;
    });
    if (rowActionConfigs) {
      newColumns.push({
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, record, index) => (
          <TableRowActionButtons actionConfigs={rowActionConfigs}
            item={record} index={index} actionCallback={this.freshData}
            handleActionLoading={this.handleActionLoading}/>),
      });
    }
    const dataSource = datas.map(it => {
      if (it.key) {
        return it;
      }
      const newIt = Object.assign({}, it);
      newIt.key = it.id || `data-${updateKey()}`;
      return newIt;
    });
    const tableProps = {
      selectedRows,
      rowSelection,
      dataSource,
      loading,
      columns: newColumns,
      pagination: paginationProps,
      onChange: this.handleTableChange,
      ...rest,
    };
    if (rowActionConfigs) {
      tableProps.scroll = {
        x: scrollX,
      }
    }
    const hasActionRow = (primaryActionConfs && primaryActionConfs.length > 0) ||
      (batchActionConfs && batchActionConfs.length > 0);
    return (
      <div className={styles['standard-table']}>
        {hasActionRow && (
          <SearchForm
            primaryActionConfs={primaryActionConfs}
            batchActionConfs={batchActionConfs}
            selectedItems={selectedRows}
            onFresh={this.freshData}
            handleActionLoading={this.handleActionLoading} />
        )}
        <Card className={styles['table-card']}>
          <Table
            {...tableProps}
          />
        </Card>
      </div>
    );
  }
}

export default StandardTable;
