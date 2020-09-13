import * as types from './type';

const initializeStore = {
  menuCurrent: ['/'],
  menu: [
    {
      value: '/',
      label: '首页',
    },
    {
      value: '/search/all',
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
    {
      value: '/project-classes',
      label: '项目分类',
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
  } else {
    return state;
  }
};
export default OutlineReduver;
