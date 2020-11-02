import * as types from './type';

const initializeStore = {
  menuCurrent: ['/'],
  userInfo: {},
  isLogin: null,
  menu: [
    {
      value: '/',
      label: '首页',
    },
    {
      value: '/article',
      label: '广场',
    },
    {
      value: '/navi',
      label: '导航',
    },
    {
      value: '/issue',
      label: '问答',
    },
    {
      value: '/tree',
      label: '体系',
    },
    {
      value: '/project',
      label: '项目',
    },
    {
      value: '/wxarticle',
      label: '公众号',
    },
  ],
};

const OutlineReduver = (state = initializeStore, { type, payload }) => {
  // 路由切换
  if (type === types.OUTLINE_TICK) {
    return {
      ...state,
      menuCurrent: payload,
    };
  } else if (type === types.USER_INFO) {
    return {
      ...state,
      userInfo: payload,
    };
  } else if (type === types.IS_LOGIN) {
    return {
      ...state,
      isLogin: payload,
    };
  } else {
    return state;
  }
};
export default OutlineReduver;
