import { gettext } from 'ttag';
import { getFlavors, getComputeHosts, getVolumeTypes, getZones } from '../service';

// console.log(images);
const allowed = item => true;

const perform = item => {
  const model = {
    visible: 'public',
    system: 'centos',
    host: '',
  };

  const cpuForm = {
    type: 'radio-buttons',
    label: gettext('CPU'),
    name: 'cpu',
    id: 'cpu',
    titleMap: [],
  };

  const memoryForm = {
    type: 'radio-buttons',
    label: gettext('Memory'),
    name: 'flavor',
    id: 'flavor',
    titleMap: [],
  };

  const volumeTypeForm = {
    type: 'radio-buttons',
    label: gettext('Volume Type'),
    name: 'volume',
    id: 'volume',
    titleMap: [],
  }

  const volumeSizeForm = {
    type: 'slider',
    label: 'Volume Size',
    id: 'size',
    name: 'size',
    min: 10,
    max: 1024,
    initialValue: 50,
  };

  const zoneForm = {
    id: 'zone',
    type: 'button-checks',
    label: gettext('Available Zone'),
    name: 'zone',
    titleMap: [],
    emptyHint: 'no zones',
    rules: [
      {
        required: true, message: 'Please select zone',
      },
    ],
  };

  const computeHostForm = {
    id: 'host',
    type: 'select',
    label: gettext('Compute Host'),
    extra: '如果没有选择计算节点，系统会将云主机自动调度到一台计算节点',
    name: 'host',
    titleMap: [],
    emptyHint: 'no images',
  }

  let flavors = [];
  let volumes = [];
  let hosts = [];
  let zones = [];


  const onChangeCpu = ({ value, callback }) => {
    const rams = flavors.filter(it => it.extras.instance_type === 'common' && it.vcpus === value);
    rams.sort((a, b) => a.ram - b.ram);
    const titleMap = rams.map(it => ({
      value: it.id,
      name: `${it.ram / 1024}G`,
    }));
    memoryForm.titleMap = titleMap;
    if (callback) {
      callback({
        flavor: titleMap[0].value,
      })
    } else {
      model.flavor = titleMap[0].value;
    }
  }
  cpuForm.onChange = onChangeCpu;

  const formItems = [
    cpuForm,
    memoryForm,
    volumeTypeForm,
    volumeSizeForm,
    zoneForm,
    computeHostForm,
  ];

  const onSubmit = values => {
    console.log(values);
    return false;
  }

  const config = {
    formItems,
    model,
    memoryForm,
    onSubmit,
    labels: {
      title: 'Specification',
      success: 'success',
      error: 'failed',
    },
  };

  const onLoad = res => {
    flavors = res[0].items;
    volumes = res[1].items;
    zones = res[2].items;
    hosts = res[3].items;

    const cpus = [];
    const cpuTitleMaps = [];
    flavors
      .filter(it => it.extras.instance_type === 'common')
      .forEach(it => {
        const cpu = it.vcpus;
        if (cpus.indexOf(cpu) < 0) {
          cpus.push(cpu);
          cpuTitleMaps.push({
            value: cpu,
            name: `${cpu}C`,
          })
        }
      });
    cpuTitleMaps.sort((a, b) => a.value - b.value);
    cpuForm.titleMap = cpuTitleMaps;
    const cpuValue = cpuTitleMaps[0].value;
    model.cpu = cpuValue;
    onChangeCpu({ value: cpuValue });

    const volumeTitleMaps = volumes.map(it => (
      {
        value: it.id,
        name: it.name,
      }
    ));

    volumeTypeForm.titleMap = volumeTitleMaps;
    model.volume = volumeTitleMaps[0].value;

    const zoneTitleMaps = zones
      .filter(it => it.zoneState && it.zoneState.available)
      .map(it => ({
        value: it.zoneName,
        name: it.zoneName,
      }));
    zoneForm.titleMap = zoneTitleMaps;
    model.zone = zoneTitleMaps[0].value;

    const hostTitleMaps = hosts
      .filter(it => it.state === 'up' && it.host.indexOf('ironic') < 0)
      .sort((a, b) => a.host.localeCompare(b.host))
      .map(it => ({
        value: it.host,
        name: it.host,
      }));
    hostTitleMaps.unshift({
      value: '',
      name: gettext('Select Compute Host'),
    });
    computeHostForm.titleMap = hostTitleMaps;

    return config;
  }

  return Promise.all([
    getFlavors({ get_extras: true }),
    getVolumeTypes(),
    getZones(),
    getComputeHosts({ binary: 'nova-compute' }),
  ]).then(onLoad);
};

const config = {
  allowed,
  perform,
  id: 'specification',
  name: 'Specification',
}

export default config;
