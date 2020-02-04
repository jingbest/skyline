function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    "username": "admin",
    "project_name": "admin",
    "user_domain_id": "default",
    "roles": [{
      "name": "project_admin"
    }, {
      "name": "admin"
    }, {
      "name": "heat_stack_owner"
    }, {
      "name": "project_payer"
    }],
    "services_region": "RegionOne",
    "domain_context_name": null,
    "user_domain_name": "Default",
    "enabled": true,
    "domain_name": null,
    "id": "8cc65e16478b4b21815b1505c9042b0c",
    "available_services_regions": ["RegionOne"],
    "is_superuser": true,
    "token": "gAAAAABd6GPmT8AtGcU4QN-JbZNj4zqAfqnW4NxaomoI4DNZo0qaC0buGCf1th4-YwFPz-4akEiRRPQXS-08B4PV3KK1bQMbkUSO1kugLKnQ82CVoE2hdtBV8IVIP3cvueB0f743R8locZRZ3nTB67oWczXl1oaWA0vOdZOm-pxeT4vmjmpadOmGy9RSgr2JTNi6cKNYb9M8",
    "auth_url": "https://172.16.50.253:5000",
    "project_id": "41b10ba1ffaf45d6ab82e9abf8f1e674",
    "domain_id": null,
    "domain_context": null,
    project_name: 'admin',
    project_id: '41b10ba1ffaf45d6ab82e9abf8f1e674',
    default_project_id: '41b10ba1ffaf45d6ab82e9abf8f1e674',
    projects: [{
      id: '41b10ba1ffaf45d6ab82e9abf8f1e674',
      name: 'admin',
    }],
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, username, type } = req.body;
    console.log(password, username, type);
    if (password === '99cloud' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    if (password === '99cloud' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
