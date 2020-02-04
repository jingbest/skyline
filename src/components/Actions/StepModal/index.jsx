import React, { PureComponent } from 'react';
import { Modal, Steps, Button, Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import updateKey from '@/utils/updateKey';
import FormItem from '@/components/FormItem';

// @connect(({ modalAndStepForm }) => ({
//   data: modalAndStepForm.step,
//   current: modalAndStepForm.current,
// }))
class StepModal extends PureComponent {
  componentDidMount() {
    const { dispatch, initialValues } = this.props;
    this.updateData(initialValues);
  }

  componentWillUnmount() {
    this.updateStep(0);
    this.clearData();
  }

  updateStep = newVale => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'modalAndStepForm/saveCurrentStep',
        payload: newVale,
      });
    }
  }

  updateData = data => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'modalAndStepForm/saveStepFormData',
        payload: data,
      });
    }
  }

  clearData = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'modalAndStepForm/initStepFormData',
        payload: {},
      });
    }
  }

  getData = () => {
    const { data } = this.props;
    return data;
  }

  onClickBack = () => {
    const { current } = this.props;
    if (current > 0) {
      this.updateStep(current - 1);
    }
  }

  onClickConfirm = () => {
    const { current, steps, form, onSubmit, data } = this.props;
    const totalSteps = steps.length;
    if (current < totalSteps) {
      form.validateFields((err, values) => {
        if (err) {
          console.log('Values has error: ', err);
          return;
        }
        console.log('Received values of form: ', values);
        // this.updateData(values);
        console.log('after update', this.getData());
        if (current < totalSteps - 1) {
          this.updateStep(current + 1);
        } else if (onSubmit) {
          const totalData = {
            ...data,
            ...values,
          };
          onSubmit(totalData);
        }
      });
    } else {
      onSubmit(data);
    }
  }

  onInitStepData = data => {

  }

  outputData = () => {
    const { data } = this.props;
    const items = Object.keys(data).map(it => {
      return <h4 key={`title-${updateKey()}`}>{it} : {data[it]}</h4>
    });
    return (
      <div>
        {items}
      </div>
    )
  }

  render() {
    const { Step } = Steps;
    const { title, visible, onOK, onCancel, key, steps, rightContext, form, data } = this.props;
    const hasRight = !!rightContext;
    const { current } = this.props;
    const stepItems = steps.map(it => (
      <Step title={it.title} key={`step-${updateKey()}`} />
    ));
    const { formItems } = steps[current];
    const items = formItems.map(it => {
      const config = {
        ...it,
      };
      if (data[it.id]) {
        config.initialValue = data[it.id];
      }
      return (
        <FormItem form={form} {...config} key={config.id} />
      )
    });
    const rightInner = this.outputData();

    return (
      <Modal
        className={hasRight ? `${styles.modal} ${styles['has-right']}` : styles.modal}
        width={hasRight ? 1065 : 800}
        style={{ top: 50 }}
        destroyOnClose
        maskClosable={false}
        title={title}
        visible={visible}
        onOk={onOK}
        onCancel={onCancel}
        key={key}
        footer={null}
      >
        <div className={styles.left}>
          <div className={styles.steps}>
            <Steps current={1} className={styles.step}>
              {stepItems}
            </Steps>
          </div>
          <div className={styles.main}>
            {items}
          </div>
          <div className={styles.footer}>
            <Button type="primary" className={styles.back} onClick={this.onClickBack}>上一步</Button>
            <Button type="primary" className={styles.confirm} onClick={this.onClickConfirm}>确认订单</Button>
          </div>
        </div>
        {hasRight && <div className={styles.right}>
          {rightInner}
        </div>}
      </Modal>
    )
  }
}

const WrapperForm = Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    const { dispatch } = props;
    dispatch({
      type: 'modalAndStepForm/saveStepFormData',
      payload: allValues,
    });
  },
})(StepModal);

export default connect(({ modalAndStepForm }) => ({
  data: modalAndStepForm.step,
  current: modalAndStepForm.current,
}))(WrapperForm);
