import imageConfig from './image';
import specificationConfig from './specification';
import networkConfig from './network';
import securityConfig from './security';
import baseConfig from './base';
import action9Config from './action9';
// import { getCreateActionConfig } from './createAction';
// import { getCreateActionConfig2 } from './createAction2';
import deleteActionConfig from './deleteAction';
import deleteActionConfig2 from './deleteAction2';
import deleteActionConfig3 from './deleteAction3';

// console.log(getCreateActionConfig);

const actionConfigs = {
  rowActionConfigs: {
    firstAction: baseConfig,
    moreActions: [
      {
        title: '云主机状态',
        actions: [
          networkConfig,
          imageConfig,
          specificationConfig,
          securityConfig,
          action9Config,
          deleteActionConfig,
        ],
      },
      {
        title: '云镜像和操作系统',
        actions: [],
      }, {
        action: action9Config,
      },
    ],
  },
  // primaryActionConfs: [
  //   getCreateActionConfig,
  //   getCreateActionConfig2,
  // ],
  batchActionConfs: [
    deleteActionConfig,
    deleteActionConfig2,
    deleteActionConfig3,
  ],
};

export default actionConfigs;
