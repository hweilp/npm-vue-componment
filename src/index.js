/**
 * name : Application
 * desc :
 * at : Created by HW with WebStorm on 2018/7/13 14:03.
 * uri :
 */

import Areas from './views/area/index.js';
import CtSelect from './views/select/index.js';

const components = [
  Areas,
  CtSelect
]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Areas,
  CtSelect
}
