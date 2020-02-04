import { gettext, t } from 'ttag';
import {
  getNetworks, getSubnets, getSharedNetworks,
  getSecurityGroups, getUsedIps,
} from '../service';

// console.log(images);
const allowed = item => true;

const perform = item => {
  let networks = [];
  let subnets = [];
  let sharedNetworks = [];
  let securityGroups = [];

  const networkTypeForm = {
    type: 'radio-buttons',
    label: gettext('CPU'),
    name: 'networkType',
    id: 'networkType',
    titleMap: [{
      value: 'private',
      name: gettext('Private Network'),
    }, {
      value: 'shared',
      name: gettext('Shared Network'),
    }],
    initialValue: 'private',
  };

  const networkForm = {
    id: 'network',
    type: 'button-checks',
    label: gettext('Network'),
    name: 'network',
    titleMap: [],
    emptyHint: 'No available network',
    rules: [
      {
        required: true, message: 'Please select network',
      },
    ],
  };

  let subnetForm;

  const validatorIP = (rule, value, callback) => {
    console.log(value);
    if (!value.ipValue || !value.ipValue.isEdit || value.ipValue.valid) {
      subnetForm.validateStatus = 'success';
      callback();
      return;
    }
    subnetForm.validateStatus = 'error';
    callback('Please input valid ip');
  };

  const onChangeSubnet = ({ value, valueItem, oldValue }) => {
    console.log(value, valueItem, oldValue);
    const params = {
      device_owner: 'network:dhcp',
      fixed_ips: [`subnet_id=${value}`],
    };
    subnetForm.tooltip = `${valueItem.allocation_pools[0].start} - ${valueItem.allocation_pools[0].end}`;
    if (!oldValue || oldValue !== value) {
      getUsedIps(params).then(res => {
        const ports = res.items.filter(it => it.fixed_ips[0] !== value);
        const ips = ports.map(it => it.fixed_ips[0].ip_address).join(', ');
        subnetForm.usedIps = ips;
        if (ips) {
          subnetForm.tooltip += t` Among them, ${ips} is occupied by DHCP.`;
        }
      });
    }
  }

  subnetForm = {
    id: 'subnet',
    type: 'subnet-select',
    label: gettext('Subnet'),
    name: 'subnet',
    subnets: [],
    emptyHint: 'No available subnet',
    validateStatus: 'success',
    help: 'ip error',
    rules: [
      {
        required: true, message: 'Please select subnet',
      },
      {
        validator: validatorIP,
      },
    ],
    onChange: onChangeSubnet,
  };

  const securityGroupForm = {
    id: 'securityGroup',
    type: 'button-checks',
    label: gettext('Security Group'),
    name: 'securityGroup',
    titleMap: [],
    emptyHint: 'No available security group',
    rules: [
      {
        required: true, message: 'Please select security group',
      },
    ],
  };

  const model = {
    visible: 'public',
    system: 'centos',
  }


  const formItems = [
    networkTypeForm,
    networkForm,
    subnetForm,
    securityGroupForm,
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
      title: 'Specification',
      success: 'success',
      error: 'failed',
    },
  };
  const onChangeNetwork = ({ value, callback }) => {
    let currentSubnets = [];
    let network = networks.find(it => it.id === value);
    if (!network) {
      network = sharedNetworks.find(it => it.id === value);
    }
    if (network && network.subnets.length > 0) {
      currentSubnets = subnets
        .filter(it => network.subnets.indexOf(it.id) >= 0);
    }
    subnetForm.subnets = currentSubnets;
    const subnetValue = currentSubnets[0];
    if (callback) {
      callback({
        subnet: subnetValue.id,
      });
    } else {
      model.subnet = subnetValue.id;
    }
    onChangeSubnet({
      value: subnetValue.id,
      valueItem: subnetValue,
    });
  }

  const onChangeNetworkType = ({ value, callback }) => {
    let titleMap = [];
    if (value === 'private') {
      titleMap = networks.map(it => ({
        value: it.id,
        name: it.name,
      }));
    } else {
      titleMap = sharedNetworks.map(it => ({
        value: it.id,
        name: it.name,
      }));
    }
    networkForm.titleMap = titleMap;
    const networkValue = (titleMap[0] && titleMap[0].value) || '';
    if (callback) {
      callback({
        network: networkValue,
      });
    }
    model.network = networkValue;
    onChangeNetwork({
      value: networkValue,
      callback,
    });
  }

  networkTypeForm.onChange = onChangeNetworkType;
  networkForm.onChange = onChangeNetwork;

  const onLoad = res => {
    networks = res[0].items.filter(it => it.subnets.length > 0 && !it.shared);
    sharedNetworks = res[1].items.filter(it => it.subnets.length > 0);
    subnets = res[2].items;
    securityGroups = res[3].items;

    onChangeNetworkType({ value: 'private' });

    const securityGroupTitleMaps = securityGroups.map(it => (
      {
        value: it.id,
        name: it.name,
      }
    ));

    securityGroupForm.titleMap = securityGroupTitleMaps;
    securityGroupForm.initialValue = (securityGroupTitleMaps[0] && securityGroupTitleMaps[0].value) || '';

    return config;
  }

  return Promise.all([
    getNetworks(),
    getSharedNetworks(),
    getSubnets(),
    getSecurityGroups(),
  ]).then(onLoad);
};

const config = {
  allowed,
  perform,
  id: 'network',
  name: 'Network Config',
}

export default config;
