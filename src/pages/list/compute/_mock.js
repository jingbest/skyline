import {
  instances, images, flavors, volumeTypes, zones, computeHosts,
  networks, subnets, sharedNetworks, securityGroups, usedIPs,
  keyPairs,
} from './_mock.data';

// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 88; i += 1) {
  // for (let i = 0; i < 2; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function getListWithoutPage() {
  const item = instances.items[0];
  const items = [];
  for (let i = 0; i <= 50; i += 1) {
    const newItem = Object.assign({}, item);
    newItem.id += i.toString();
    newItem.name += i.toString();
    items.push(newItem);
  }
  const newData = {
    items,
  }
  return newData;
}

function getList(req, res) {
  // return res.json(getListWithoutPage());
  if (!instances.pagination) {
    instances.pagination = {
      total: instances.counts,
    }
  }
  return res.json(instances);
}

function postRule(req, res, u, b) {
  let url = u;

  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;

    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;

    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          return { ...item, desc, name };
        }

        return item;
      });
      break;

    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };
  return res.json(result);
}

function postName(req, res, u) {
  // return res.json(getListWithoutPage());
  const data = {
    result: 1,
  }
  return res.json(data);
}

function getData(req, res) {
  const item = instances.items[0];
  return res.json(item);
}

function getImages(req, res) {
  return res.json(images);
}

function getFlavors(req, res) {
  return res.json(flavors);
}

function getVolumeTypes(req, res) {
  return res.json(volumeTypes);
}

function getZones(req, res) {
  return res.json(zones);
}

function getComputeHosts(req, res) {
  return res.json(computeHosts);
}

function getNetworks(req, res) {
  return res.json(networks);
}

function getSubnets(req, res) {
  return res.json(subnets);
}

function getSharedNetworks(req, res) {
  return res.json(sharedNetworks);
}

function getSecurityGroups(req, res) {
  return res.json(securityGroups);
}

function getUsedIps(req, res) {
  return res.json(usedIPs);
}

function getKeyPairs(req, res) {
  return res.json(keyPairs);
}

export default {
  'GET /api/contrib/nova/servers/': getList,
  'POST /api/rule2': postRule,
  'POST /api/contrib/nova/servers/c0a3fecf-7d11-4925-80e3-0e1cd66dae47/': postName,
  'GET /api/contrib/nova/servers/c0a3fecf-7d11-4925-80e3-0e1cd66dae47/': getData,
  'GET /api/glance/images/': getImages,
  'GET /api/contrib/nova/flavors/': getFlavors,
  'GET /api/contrib/cinder/volumetypes/': getVolumeTypes,
  'GET /api/nova/availzones/': getZones,
  'GET /api/contrib/nova/compute_hosts/': getComputeHosts,
  'GET /api/contrib/neutron/subnets/': getSubnets,
  'GET /api/contrib/neutron/networks/': getNetworks,
  'GET /api/contrib/neutron/networks/shared/': getSharedNetworks,
  'GET /api/contrib/neutron/security_groups/': getSecurityGroups,
  'GET /api/neutron/ports/': getUsedIps,
  'GET /api/contrib/nova/key_pairs/': getKeyPairs,
};
