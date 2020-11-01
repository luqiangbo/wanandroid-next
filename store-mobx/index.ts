import { action, observable, computed, runInAction } from 'mobx';
import { useStaticRendering } from 'mobx-react';
import { useMemo } from 'react';

useStaticRendering(typeof window === 'undefined');

let store;

class Store {
  @observable lastUpdate = 0;
  @observable light = false; // 权限
  @observable timer = null; // 时间
  @observable userInfo = {};
  //
  @action start = () => {
    this.timer = setInterval(() => {
      runInAction(() => {
        this.lastUpdate = Date.now();
        this.light = true;
      });
    }, 1000);
  };
  // 设置用户权限
  @action setUserInfo = async (value) => {
    console.log('mobx', value);
    // runInAction(() => {
    //   this.userInfo = value;
    // });
  };

  @computed get timeString() {
    const pad = (n) => (n < 10 ? `0${n}` : n);
    const format = (t) => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`;
    return format(new Date(this.lastUpdate));
  }

  hydrate = (data) => {
    if (!data) return;

    this.lastUpdate = data.lastUpdate !== null ? data.lastUpdate : Date.now();
    this.light = !!data.light;
  };
}

function initializeStoreMobx(initialData = null) {
  const _store = store ?? new Store();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStoreMobx(initialState) {
  const store = useMemo(() => initializeStoreMobx(initialState), [initialState]);
  return store;
}
