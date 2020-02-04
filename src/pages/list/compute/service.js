import request from '@/utils/request';

export async function getDataList(params) {
  const req = await request('/api/contrib/nova/servers/', {
    params,
  });
  return {
    items: req.items,
    pagination: {
      current: 1,
      total: req.count,
    },
  };
}
export async function getData(params) {
  const url = '/api/contrib/nova/servers/c0a3fecf-7d11-4925-80e3-0e1cd66dae47/';
  const req = await request(url, {
    params,
  });
  return req;
}
export async function removeRule(params) {
  return request('/api/rule2', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule2', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule2', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
export async function updateName(params) {
  const url = `/api/contrib/nova/servers/${params.id}/`;
  return request(url, {
    method: 'POST',
  })
}
export async function getImages(params) {
  const url = '/api/glance/images/';
  return request(url, {
    params,
  });
}
export async function getFlavors(params) {
  const url = '/api/contrib/nova/flavors/';
  return request(url, {
    params,
  });
}
export async function getVolumeTypes(params) {
  const url = '/api/contrib/cinder/volumetypes/';
  return request(url, {
    params,
  });
}
export async function getZones(params) {
  const url = '/api/nova/availzones/';
  return request(url, {
    params,
  });
}
export async function getComputeHosts(params) {
  const url = '/api/contrib/nova/compute_hosts/';
  return request(url, {
    params,
  });
}

export async function getNetworks(params) {
  const url = '/api/contrib/neutron/networks/';
  return request(url, {
    params,
  });
}

export async function getSubnets(params) {
  const url = '/api/contrib/neutron/subnets/';
  return request(url, {
    params,
  });
}

export async function getSharedNetworks(params) {
  const url = '/api/contrib/neutron/networks/shared/';
  return request(url, {
    params,
  });
}

export async function getSecurityGroups(params) {
  const url = '/api/contrib/neutron/security_groups/';
  return request(url, {
    params,
  });
}

export async function getUsedIps(params) {
  const url = '/api/neutron/ports/';
  return request(url, {
    params,
  });
}

export async function getKeyPairs(params) {
  const url = '/api/contrib/nova/key_pairs/';
  return request(url, {
    params,
  });
}
